import { BadRequestException } from '@nestjs/common';

export class InsufficientAmountException extends BadRequestException {
  private static readonly FIXED_MESSAGE = '원 이상 입력되어야 합니다. input = ';

  constructor(minimumMoney:number, input: number) {
    const message = minimumMoney + InsufficientAmountException.FIXED_MESSAGE + input;
    super(message);
  }
}
