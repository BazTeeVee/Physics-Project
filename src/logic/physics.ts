const g = 9.807;

class Vector {
  x: number;

  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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

  add(b: Vector): Vector {
    const x = this.x + b.x;
    const y = this.y + b.y;

    return new Vector(x, y);
  }

  subtract(b: Vector): Vector {
    const x = this.x - b.x;
    const y = this.y + b.y;

    return new Vector(x, y);
  }

  multiply(b: Vector | number): Vector {
    if (typeof (b) === 'number') {
      const x: number = this.x * b;
      const y: number = this.y * b;

      return new Vector(x, y);
    }
    const theta: number = Math.abs(this.getTheta() - b.getTheta());
    const magnitude: number = this.getMagnitude() * b.getMagnitude() * Math.sin(theta);

    const x: number = magnitude * Math.cos(theta);
    const y: number = magnitude * Math.sin(theta);

    return new Vector(x, y);
  }

  dot(b: Vector): number {
    const product = this.x * b.x + this.y * b.y;

    return product;
  }
}

export { g, Vector };
