import React from 'react';
import Canvas from '@/modules/Canvas';

import GameObject from '@/prefabs/GameObject';
import { g, Vector } from '@/logic/physics';
import PauseButton from '@/modules/tools/PauseButton';
import { ToolType } from '@/Types';
import ToolButton from '@/modules/tools/ToolButton';

export default function Home() {
  const gameObjects: GameObject[] = [
    new GameObject(
      new Vector(-100, 0),
      new Vector(40, 60),
      new Vector(0, -g),
      {
        mass: 10,
        size: [10, 10],
        color: 'blue',
      },
    ),
    new GameObject(
      new Vector(0, 0),
      new Vector(0, 60),
      new Vector(0, -g),
      {
        mass: 10,
        size: [10, 10],
      },
    ),
    new GameObject(
      new Vector(100, 0),
      new Vector(-40, 60),
      new Vector(-0, -g),
      {
        mass: 20,
        size: [10, 10],
        color: 'green',
      },
    ),
  ];

  let paused: boolean = false;
  let toolType: ToolType = 'null';

  let width: number = 0;
  let height: number = 0;

  let selectedObject: GameObject | null = null;

  // let cameraX: number = 0;
  // let cameraY: number = 0;

  let mouseX = 0;
  let mouseY = 0;

  let lastFrameTime = Date.now();
  let currentFrameTime = Date.now();
  let deltaTime = 0;

  const onMouseUpdate = (event: any) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const selectObject = (object: GameObject | null) => {
    if (selectedObject) selectedObject.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    if (!object) {
      selectedObject = null;

      return;
    }

    selectedObject = object;
    selectedObject.color = 'yellow';
  };

  let ctx: CanvasRenderingContext2D;

  const start = (renderingContext: CanvasRenderingContext2D) => {
    ctx = renderingContext;

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    document.addEventListener('mousemove', onMouseUpdate, false);

    ctx.canvas.height = height;
    ctx.canvas.width = width;

    selectObject(gameObjects[1]);
    gameLoop();
  };

  const mouseDown = () => {
    if (toolType === 'add') addObject();
  };

  const setToolType = (tool: ToolType) => {
    if (tool === toolType) toolType = 'null';
    else toolType = tool;
  };

  const addObject = () => {
    const obj = new GameObject(
      new Vector(mouseX - width / 2, height / 2 - mouseY),
      new Vector(Math.random() * 80 - 40, Math.random() * 120 - 60),
      new Vector(0, -g),
      {
        size: [10, 10],
      },
    );
    gameObjects.push(obj);

    selectObject(gameObjects[gameObjects.length - 1]);
  };

  const gameLoop = async () => {
    requestAnimationFrame(gameLoop);

    lastFrameTime = currentFrameTime;
    currentFrameTime = Date.now();
    deltaTime = (currentFrameTime - lastFrameTime) / 1000;

    if (!paused) {
      await update();
    }

    render();
  };

  const update = async () => {
    gameObjects.forEach((object: GameObject) => {
      if (!object.isAsleep) {
        object.move(deltaTime);
      }
    });

    if (selectedObject) {
      const selected: GameObject = selectedObject;
      selected.color = 'yellow';
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    gameObjects.forEach((object: GameObject) => {
      object.render(ctx);
    });
  };

  const handlePauseButtonClick = () => {
    paused = !paused;
  };

  return (
    <div>
      <Canvas start={start} onMouseDown={mouseDown} />
      <div className="tools">
        <PauseButton id="pause-button" toggle={handlePauseButtonClick} />
        <ToolButton toolType="add" setTool={setToolType} />
        {/* <ToolButton toolType="step" setTool={step} /> */}
      </div>
    </div>
  );
}
