/* eslint-disable @typescript-eslint/lines-between-class-members */
const g = 9.8;
const k = 2285.4;

class Vector {
  static ZEROES = new Vector(0, 0);
  static GRAVITY = new Vector(0, -g);

  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  normal(): Vector {
    const theta = this.getTheta();

    const newX = this.x * Math.cos(theta) - this.y * Math.sin(theta);
    const newY = this.x * Math.sin(theta) + this.y * Math.cos(theta);

    return new Vector(newX, newY);
  }

  normalised(): Vector {
    const theta: number = this.getTheta();

    return new Vector(Math.cos(theta), Math.sin(theta));
  }

  getMagnitude(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  getTheta(): number {
    return Math.atan2(this.y, this.x);
  }

  add(b: Vector | number): Vector {
    if (typeof (b) === 'number') {
      const x = this.x + b;
      const y = this.y + b;

      return new Vector(x, y);
    }

    const x = this.x + b.x;
    const y = this.y + b.y;

    return new Vector(x, y);
  }

  subtract(b: Vector | number): Vector {
    if (typeof (b) === 'number') {
      const x = this.x - b;
      const y = this.y - b;

      return new Vector(x, y);
    }

    const x = this.x - b.x;
    const y = this.y - b.y;

    return new Vector(x, y);
  }

  multiply(b: number): Vector {
    const x: number = this.x * b;
    const y: number = this.y * b;

    return new Vector(x, y);
  }

  divide(b: number): Vector {
    const x: number = this.x / b;
    const y: number = this.y / b;

    return new Vector(x, y);
  }

  dot(b: Vector): number {
    const product = this.x * b.x + this.y * b.y;

    return product;
  }

  cross(b: Vector): Vector {
    const theta: number = this.getTheta() - b.getTheta();
    const magnitude: number = this.getMagnitude() * b.getMagnitude() * Math.sin(theta);

    const x: number = magnitude * Math.cos(theta);
    const y: number = magnitude * Math.sin(theta);

    return new Vector(x, y);
  }

  greater(b: Vector): boolean {
    return (this.x > b.x && this.y > b.y);
  }

  lesser(b: Vector): boolean {
    return (this.x < b.x && this.y < b.y);
  }

  equal(b: Vector): boolean {
    return (this.x === b.x && this.y === b.y);
  }

  toString(): string {
    const x = `${this.x}`.substring(0, 6);
    const y = `${this.y}`.substring(0, 6);

    return `x: ${x}, y: ${y}`;
  }

  static max(a: Vector, b: Vector): Vector {
    const maxX = Math.max(a.x, b.x);
    const maxY = Math.max(a.y, b.y);

    return new Vector(maxX, maxY);
  }

  static min(a: Vector, b: Vector): Vector {
    const minX = Math.min(a.x, b.x);
    const minY = Math.min(a.y, b.y);

    return new Vector(minX, minY);
  }

  static abs(a: Vector) {
    return new Vector(Math.abs(a.x), Math.abs(a.y));
  }
}

export { g, k, Vector };
