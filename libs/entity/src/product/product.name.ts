import { ProductNameException } from '@lib/exception';
import { Column } from 'typeorm';

export class ProductName {
  private static readonly MINIMUM_PRODUCT_NAME_LENGTH = 2;
  private static readonly MAXIMUM_PRODUCT_NAME_LENGTH = 30;

  @Column()
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  static from(value: string): ProductName {
    this.validate(value);
    return new ProductName(value);
  }

  private static validate(value: string) {
    if (!value || value.length < this.MINIMUM_PRODUCT_NAME_LENGTH) {
      throw ProductNameException.minimumLengthException(
        this.MINIMUM_PRODUCT_NAME_LENGTH,
      );
    }

    if (value.length > this.MAXIMUM_PRODUCT_NAME_LENGTH) {
      throw ProductNameException.maximumLengthException(
        this.MAXIMUM_PRODUCT_NAME_LENGTH,
      );
    }
  }

  get value(): string {
    return this._value;
  }
}
