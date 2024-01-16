import {
  InsufficientAmountException,
  InvalidDenominationException,
} from '@lib/exception';
import { Column } from 'typeorm';

export class Money {
  private static readonly MINIMUM_UNIT = 10;
  private static readonly MINIMUM_MONEY = 1000;

  @Column({ name: 'price' })
  private readonly _value: number;

  private constructor(value: number) {
    this._value = value;
  }

  static from(value: number): Money {
    this.validate(value);
    return new Money(value);
  }

  private static validate(value: number) {
    if (!value || value < this.MINIMUM_MONEY) {
      throw new InsufficientAmountException(this.MINIMUM_MONEY, value);
    }
    if (value % this.MINIMUM_UNIT) {
      throw new InvalidDenominationException(value);
    }
  }

  largerOrSameThan(other: Money): boolean {
    return this.value >= other.value;
  }

  get value(): number {
    return this._value;
  }
}
