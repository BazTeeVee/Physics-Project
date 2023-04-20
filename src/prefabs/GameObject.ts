import { Vector } from '../logic/physics';

const FLOOR_HEIGHT = -20;

interface GameObjectArguments {
  mass?: number;
  size?: Vector;
  color?: string;
  atRest?: boolean;
}

export default class GameObject {
  static NUM_OBJECTS = 0;

  id: number;

  position: Vector;
  velocity: Vector;
  acceleration: Vector;

  mass: number = 10;
  size: Vector = new Vector(10, 10);
  color: string = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  collision: boolean = false;

  atRest: boolean = false;

  constructor(position: Vector, velocity: Vector, acceleration: Vector, options?: GameObjectArguments) {
    this.id = GameObject.NUM_OBJECTS++;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = acceleration;

    if (options) {
      const {
        mass,
        size,
        color,
        atRest: isAsleep,
      } = options;

      if (mass) this.mass = mass;
      if (size) this.size = size;
      if (color) this.color = color;
      if (isAsleep) this.atRest = isAsleep;
    }
  }

  move(deltaTime: number): Vector {
    const newPosition: Vector = this.position.add(this.velocity.multiply(deltaTime));
    const newVelocity: Vector = this.velocity.add(this.acceleration.multiply(deltaTime));

    this.position = newPosition;
    this.velocity = newVelocity;

    this.position.y = Math.max(this.position.y, FLOOR_HEIGHT);
    if (this.position.y === FLOOR_HEIGHT) {
      this.atRest = true;
      this.velocity = new Vector(0, 0);

      console.log(this.position);
    }

    return newPosition;
  }

  render(ctx: CanvasRenderingContext2D, screenSize: Vector, isSelected: boolean): void {
    ctx.fillStyle = isSelected ? 'yellow' : this.color;

    // center x and & y values in the canvas
    const x = ctx.canvas.width / 2 + this.position.x;
    // since the y = 0 is top left instead of the bottom right, we have to invert the y value
    const y = ctx.canvas.height / 2 - this.position.y;

    ctx.fillRect(
      x,
      y,
      this.size.x,
      this.size.y,
    );
  }

  center(): Vector {
    const middleX = this.position.x + this.size.x / 2;
    const middleY = this.position.y + this.size.y / 2;

    return new Vector(middleX, middleY);
  }

  getContext(): Map<string, string> {
    const map = new Map<string, string>();

    map.set('id', `${this.id}`);
    map.set('mass', `${this.mass}`);
    map.set('At rest', this.atRest ? 'True' : 'False');
    map.set('position', this.position.toString());
    map.set('velocity', this.position.toString());
    map.set('acceleration', this.position.toString());
    map.set('size', this.size.toString());

    return map;
  }
}
