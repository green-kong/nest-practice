import { BadRequestException } from '@nestjs/common';

export class SmallerThanMinimumBidPrice extends BadRequestException {
  private static readonly FIXED_MESSAGE =
    '입찰가격이 상품의 최소 입찰가격 보다 낮습니다.';

  constructor(startPrice: number, bidPrice: number) {
    const message = `${SmallerThanMinimumBidPrice.FIXED_MESSAGE} minimumBidPrice = ${startPrice}, input = ${bidPrice}`;
    super(message);
  }
}
