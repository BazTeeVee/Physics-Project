/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import Canvas from '@/modules/Canvas';

import GameObject from '@/prefabs/GameObject';
import { g, Vector } from '@/logic/physics';
import PauseButton from '@/modules/PauseButton';

export default function Home() {
  const objectArr: GameObject[] = [
    new GameObject(new Vector(-10, 0), new Vector(-40, 60), new Vector(0, -g), [10, 10], 'blue'),
    new GameObject(new Vector(0, 0), new Vector(0, 60), new Vector(0, -g), [10, 10], 'white'),
    new GameObject(new Vector(10, 0), new Vector(40, 60), new Vector(-0, -g), [10, 10], 'green'),
  ];

  let paused: boolean = false;

  let width: number = 0;
  let height: number = 0;

  let selectedObject: GameObject | null = null;

  // let cameraX: number = 0;
  // let cameraY: number = 0;

  let mouseX = 0;
  let mouseY = 0;

  const onMouseUpdate = (event: any) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  };

  const selectObject = (object: GameObject | null) => {
    if (selectedObject) selectedObject.color = 'white';

    if (!object) {
      selectedObject = null;

      return;
    }

    selectedObject = object;
    selectedObject.color = 'yellow';
  };

  let lastFrameTime = Date.now();
  let currentFrameTime = Date.now();
  let deltaTime = 0;
  // let totalTime = 0;

  let ctx: CanvasRenderingContext2D;

  const start = (renderingContext: CanvasRenderingContext2D) => {
    ctx = renderingContext;

    height = document.documentElement.clientHeight;
    width = document.documentElement.clientWidth;
    document.addEventListener('mousemove', onMouseUpdate, false);

    ctx.canvas.height = height;
    ctx.canvas.width = width;

    selectObject(objectArr[1]);

    gameLoop();
  };

  const mouseDown = () => {
    addObject();
  };

  const addObject = () => {
    const obj = new GameObject(
      new Vector(mouseX - width / 2, -mouseY + height / 2),
      new Vector(Math.random() * 40 * (Math.random() > 0.5 ? 1 : -1), Math.random() * 60 * (Math.random() > 0.5 ? 1 : -1)),
      new Vector(0, -g),
      [10, 10],
    );
    objectArr.push(obj);

    selectObject(objectArr[objectArr.length - 1]);
  };

  const gameLoop = () => {
    requestAnimationFrame(gameLoop);

    lastFrameTime = currentFrameTime;
    currentFrameTime = Date.now();
    deltaTime = currentFrameTime - lastFrameTime;

    if (!paused) {
      update();
    }

    render();
  };

  const update = async () => {
    objectArr.forEach((object: GameObject) => object.move(deltaTime / 1000));

    if (selectedObject) {
      const selected: GameObject = selectedObject;
      selected.color = 'yellow';
    }
  };

  const render = () => {
    ctx.clearRect(0, 0, width, height);

    objectArr.forEach((object: GameObject) => {
      object.render(ctx);
    });
  };

  const handlePauseButtonClick = () => {
    paused = !paused;
  };

  return (
    <div>
      <Canvas start={start} onMouseDown={mouseDown} />
      <PauseButton id="pause-button" toggle={handlePauseButtonClick} />
      {paused}
    </div>
  );
}
