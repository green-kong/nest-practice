import { InsufficientAmountException, InvalidDenominationException } from '@lib/exception';

export class Money {
  private static readonly MINIMUM_UNIT = 10;
  private static readonly MINIMUM_MONEY = 1000;

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

  get value(): number {
    return this._value;
  }
}