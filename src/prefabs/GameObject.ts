import { Vector } from '../logic/physics';

const FLOOR_HEIGHT = -20;

export default class GameObject {
  position: Vector;

  velocity: Vector;

  acceleration: Vector;

  size: number[];

  color: string = 'white';

  constructor(position: Vector, velocity: Vector, acceleration: Vector, size: number[], color?: string) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;

    this.size = size;

    if (color) {
      this.color = color;
    }
  }

  move(deltaTime: number) {
    const newPosition: Vector = this.position.add(this.velocity.multiply(deltaTime));
    const newVelocity: Vector = this.velocity.add(this.acceleration.multiply(deltaTime));

    this.position = newPosition;
    this.velocity = newVelocity;

    this.position.y = Math.max(this.position.y, FLOOR_HEIGHT);
    if (this.position.y === FLOOR_HEIGHT) {
      this.velocity = new Vector(0, 0);
    }

    return newPosition;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x + ctx.canvas.width / 2 - this.size[0] / 2,
      ctx.canvas.height / 2 - this.position.y - this.size[1] / 2,
      this.size[0],
      this.size[1],
    );
  }

  setColor(color: string) {
    this.color = color;
  }

  get getColor() {
    return this.color;
  }
}
