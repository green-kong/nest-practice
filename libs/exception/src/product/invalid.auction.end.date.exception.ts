import { BadRequestException } from '@nestjs/common';

export class InvalidAuctionEndDateException extends BadRequestException {
  private static readonly FIXED_MESSAGE = '경매 마감 일자는 현재시간보다 이후의 날짜여야 합니다. input = ';

  constructor(input: Date) {
    super(InvalidAuctionEndDateException.FIXED_MESSAGE + input.toLocaleDateString());
  }
}
