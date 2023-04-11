import { Vector } from './physics';

export default class BoundingBox {
  upperBound: Vector;

  lowerBound: Vector;

  constructor(upperBound: Vector, lowerBound: Vector) {
    this.upperBound = upperBound;
    this.lowerBound = lowerBound;
  }

  area(): number {
    const vector: Vector = this.upperBound.subtract(this.lowerBound);

    return vector.x * vector.y;
  }

  combine(b: BoundingBox): BoundingBox {
    const upperBound = Vector.max(this.upperBound, b.upperBound);
    const lowerBound = Vector.min(this.lowerBound, b.lowerBound);

    return new BoundingBox(upperBound, lowerBound);
  }

  intersects(b: BoundingBox): boolean {
    let outer: BoundingBox;
    let inner: BoundingBox;
    if (this.upperBound.x > b.lowerBound.x) {
      outer = this;
      inner = b;
    } else {
      outer = b;
      inner = this;
    }

    const normalisedVector = Vector.abs(inner.upperBound).subtract(Vector.abs(outer.lowerBound));

    if (normalisedVector.x > 0 && normalisedVector.y > 0) console.log(normalisedVector, this, b);

    return (normalisedVector.x > 0 && normalisedVector.y > 0);
  }
}
