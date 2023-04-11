import BoundingBox from '@/logic/BoundingBox';
import { Vector } from '../logic/physics';

const FLOOR_HEIGHT = -20;

interface GameObjectArguments {
  mass?: number;
  size?: number[];
  color?: string;
  isAsleep?: boolean;
}

export default class GameObject {
  position: Vector;

  velocity: Vector;

  acceleration: Vector;

  mass: number = 10;

  boundingBox: BoundingBox;

  size: number[] = [10, 10];

  color: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  isAsleep: boolean = false;

  constructor(position: Vector, velocity: Vector, acceleration: Vector, options?: GameObjectArguments) {
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;

    if (options) {
      const {
        mass,
        size,
        color,
        isAsleep,
      } = options;

      if (mass) this.mass = mass;
      if (size) this.size = size;
      if (color) this.color = color;
      if (isAsleep) this.isAsleep = isAsleep;
    }

    const upperBound: Vector = new Vector(this.position.x + this.size[0] / 2, this.position.y + this.size[1] / 2);
    const lowerBound: Vector = new Vector(this.position.x - this.size[0] / 2, this.position.y - this.size[1] / 2);

    this.boundingBox = new BoundingBox(upperBound, lowerBound);
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

    const upperBound: Vector = new Vector(this.position.x + this.size[0] / 2, this.position.y + this.size[1] / 2);
    const lowerBound: Vector = new Vector(this.position.x - this.size[0] / 2, this.position.y - this.size[1] / 2);

    this.boundingBox = new BoundingBox(upperBound, lowerBound);

    return newPosition;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.position.x + ctx.canvas.width / 2,
      ctx.canvas.height / 2 - this.position.y,
      this.size[0],
      this.size[1],
    );
  }
}
