import { BadRequestException } from '@nestjs/common';

export class ProductNameException extends BadRequestException {
  private static readonly MINIMUM_LENGTH_FIXED_MESSAGE =
    '상품의 이름은 {number}글자 이상이어야 합니다.';
  private static readonly MAXIMUM_LENGTH_FIXED_MESSAGE =
    '상품의 이름은 {number}글자 이하이어야 합니다.';

  constructor(message: string) {
    super(message);
  }

  static minimumLengthException(minimumLength: number) {
    const message = this.MINIMUM_LENGTH_FIXED_MESSAGE.split('{number}').join(
      minimumLength + '',
    );
    return new ProductNameException(message);
  }

  static maximumLengthException(maximumLength: number) {
    const message = this.MAXIMUM_LENGTH_FIXED_MESSAGE.split('{number}').join(
      maximumLength + '',
    );
    return new ProductNameException(message);
  }
}
