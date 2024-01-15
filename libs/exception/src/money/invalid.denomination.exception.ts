import { BadRequestException } from '@nestjs/common';

export class InvalidDenominationException extends BadRequestException {
  private static readonly FIXED_MESSAGE =
    '10원 단위로 입력가능합니다. input = ';

  constructor(input: number) {
    super(InvalidDenominationException.FIXED_MESSAGE + input);
  }
}
