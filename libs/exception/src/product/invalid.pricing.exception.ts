import { BadRequestException } from '@nestjs/common';

export class InvalidPricingException extends BadRequestException {
  private static readonly FIXED_MESSAGE =
    '경매 시작가격은 즉시구매가격 보다 낮아야 합니다. ';

  constructor(startPrice: number, buyNowPrice: number) {
    const message = `${InvalidPricingException.FIXED_MESSAGE} startPrice = ${startPrice}, buyNowPrice = ${buyNowPrice}`;
    super(message);
  }
}
