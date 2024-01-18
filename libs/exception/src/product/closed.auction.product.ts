import { BadRequestException } from '@nestjs/common';

export class ClosedAuctionProduct extends BadRequestException {
  private static readonly FIXED_MESSAGE =
    '이미 경매가 종료된 상품입니다. input = ';

  constructor(id: number) {
    super(ClosedAuctionProduct.FIXED_MESSAGE + id);
  }
}
