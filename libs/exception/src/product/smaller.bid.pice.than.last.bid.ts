import { BadRequestException } from '@nestjs/common';

export class SmallerBidPriceThanLastBid extends BadRequestException {
  private static readonly FIXED_MESSAGE = '마지막 입찰가격보다 높아야 합니다.';

  constructor(lastBidPrice: number, newBidPrice: number) {
    const message = `${SmallerBidPriceThanLastBid.FIXED_MESSAGE} last bid price = ${lastBidPrice}, new bid price = ${newBidPrice}`;
    super(message);
  }
}
