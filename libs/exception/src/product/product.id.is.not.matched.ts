import { BadRequestException } from '@nestjs/common';

export class ProductIdIsNotMatched extends BadRequestException {
  private static readonly FIXED_MESSAGE = 'product id가 일치하지 않습니다.';

  constructor(productId: number, input: number) {
    const message = `${ProductIdIsNotMatched.FIXED_MESSAGE} productId = ${productId}, input = ${input}`;
    super(message);
  }
}
