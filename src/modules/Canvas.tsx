/* eslint-disable react-hooks/exhaustive-deps, react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';

interface CanvasProps {
  start: (ctx: CanvasRenderingContext2D) => void;
  [rest: string]: any;
}

export default function Canvas(props: CanvasProps) {
  const { start, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    let animationFrameId: number;

    start(context);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [start]);

  return <canvas id="canvas" ref={canvasRef} {...rest} />;
}
