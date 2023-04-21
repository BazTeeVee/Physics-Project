import React from 'react';
import Canvas from '@/modules/Canvas';

import GameObject from '@/prefabs/GameObject';
import { Vector, k } from '@/logic/physics';
import { ContextClass } from '@/Types';
import Context from '@/modules/Context';
import ToolButtonHandler from '@/modules/tools/ToolButtonHandler';

export default function Home() {
  const gameObjects: GameObject[] = [
    new GameObject(
      new Vector(-100, -20),
      new Vector(20, 60),
      Vector.GRAVITY,
      {
        mass: 10,
        size: new Vector(10, 10),
        color: 'blue',
      },
    ),
    new GameObject(
      new Vector(100, -20),
      new Vector(-20, 60),
      Vector.GRAVITY,
      {
        mass: 10,
        size: new Vector(10, 10),
        color: 'green',
      },
    ),
  ];

  let adding: boolean = false;

  let selectedObject: GameObject | null = null;
  const selectObject = (obj: GameObject | null) => {
    if (!obj) {
      selectedObject = null;

      return;
    }

    selectedObject = obj;
  };

  let paused: boolean = false;

  let screenSize: Vector = Vector.ZEROES;

  let mouse1Pos = Vector.ZEROES;
  let mousePosition = Vector.ZEROES;
  const onMouseUpdate = (event: any) => {
    mousePosition = new Vector(event.clientX - screenSize.x / 2, screenSize.y / 2 - event.clientY);
  };

  let lastFrameTime = Date.now();
  let currentFrameTime = Date.now();
  let deltaTime = 0;
  let totalTime = 0;

  let ctx: CanvasRenderingContext2D;

  const start = (renderingContext: CanvasRenderingContext2D) => {
    ctx = renderingContext;

    // detect mouse position at all times
    document.addEventListener('mousemove', onMouseUpdate, false);

    screenSize = new Vector(document.documentElement.clientWidth, document.documentElement.clientHeight);
    ctx.canvas.width = screenSize.x;
    ctx.canvas.height = screenSize.y;

    selectObject(gameObjects[1]);
    gameLoop();
  };

  const gameLoop = async () => {
    requestAnimationFrame(gameLoop);

    lastFrameTime = currentFrameTime;
    currentFrameTime = Date.now();
    deltaTime = (currentFrameTime - lastFrameTime) / 1000;

    if (!paused) {
      totalTime += deltaTime;
      await update();
    }

    await render();

    ContextClass.setMap(selectedObject?.getContext(totalTime) ?? new Map<string, string>());
  };

  const update = async () => new Promise((res) => {
    gameObjects.forEach((object: GameObject) => {
      if (!object.atRest) {
        object.move(deltaTime);
      }
    });

    // handle collisions
    for (let i = 0; i < gameObjects.length; i++) {
      for (let j = 0; j < gameObjects.length; j++) {
        const obj1 = gameObjects[i];
        const obj2 = gameObjects[j];

        if (!obj1 || !obj2 || obj1.id === obj2.id) continue;

        const obj1Edge = obj1.position.add(obj1.size);
        const obj2Edge = obj2.position.add(obj2.size);

        const xCollision = obj1Edge.x >= obj2.position.x && obj2Edge.x >= obj1.position.x;
        const yCollision = obj1Edge.y >= obj2.position.y && obj2Edge.y >= obj1.position.y;

        if (xCollision && yCollision) {
          if (!obj1.collision && !obj2.collision) {
            obj1.collision = true;
            obj2.collision = true;
          }

          obj1.atRest = false;
          obj2.atRest = false;

          const distanceFromCenter = obj1.center().subtract(obj2.position);

          const force = distanceFromCenter.multiply(k);
          const obj1Acceleration = force.divide(obj1.mass * 2);
          const obj2Acceleration = force.divide(-obj2.mass * 2);

          obj1.velocity = obj1.velocity.add(obj1Acceleration.multiply(deltaTime));
          obj2.velocity = obj2.velocity.add(obj2Acceleration.multiply(deltaTime));
        } else if (obj1.collision && obj2.collision) {
          obj1.collision = false;
          obj2.collision = false;
        }
      }
    }

    res(null);
  });

  const render = async () => {
    ctx.clearRect(0, 0, screenSize.x, screenSize.y);

    // render "floor"
    ctx.fillStyle = 'white';
    ctx.fillRect(
      0,
      screenSize.y / 2 + 30,
      screenSize.x,
      10,
    );

    // render all game objects
    gameObjects.forEach((object: GameObject) => {
      const isSelected = selectedObject?.id === object.id;
      object.render(ctx, screenSize, isSelected);
    });

    if (adding) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 5;

      const x1 = ctx.canvas.width / 2 + mousePosition.x;
      const y1 = ctx.canvas.height / 2 - mousePosition.y;
      const x2 = ctx.canvas.width / 2 + mouse1Pos.x;
      const y2 = ctx.canvas.height / 2 - mouse1Pos.y;

      ctx.beginPath();
      ctx.moveTo(x1, y1);

      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.moveTo(0, 0);
    }
    ctx.fillStyle = 'white';
  };

  const handlePauseButtonClick = () => {
    paused = !paused;
  };

  const mouseDown = () => {
    if (ContextClass.getToolType() === 'add') {
      mouse1Pos = mousePosition;
      adding = true;
    }
    if (ContextClass.getToolType() === 'select') attemptObjectSelection();
  };

  const mouseUp = () => {
    if (ContextClass.getToolType() === 'add') {
      const velocity = mouse1Pos.subtract(mousePosition);

      adding = false;

      addObject(velocity);
    }
  };

  const addObject = (velocity: Vector) => {
    const obj = new GameObject(
      new Vector(mousePosition.x - 5, Math.max(mousePosition.y, -10)),
      velocity,
      Vector.GRAVITY,
      {
        size: new Vector(10, 10),
      },
    );
    gameObjects.push(obj);

    selectObject(gameObjects[gameObjects.length - 1]);
  };

  const attemptObjectSelection = () => {
    gameObjects.every((object: GameObject) => {
      const upperRightBound = object.position.add(object.size);
      const lowerLeftBound = object.position.subtract(object.size);

      if (upperRightBound.greater(mousePosition) && lowerLeftBound.lesser(mousePosition)) {
        selectObject(object);
        return false;
      }

      return true;
    });
  };

  const step = () => {
    const STEP_SIZE = 0.2; // amount of time per step in seconds
    deltaTime = STEP_SIZE;
    totalTime += deltaTime;

    update();
    render();
  };

  return (
    <div>
      <Canvas start={start} onMouseUp={mouseUp} onMouseDown={mouseDown} />
      <div className="tools">
        <ToolButtonHandler togglePause={handlePauseButtonClick} step={step} />
      </div>
      <Context />
    </div>
  );
}
