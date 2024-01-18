import { BadRequestException } from '@nestjs/common';

export class NotExistedProductException extends BadRequestException {
  private static readonly FIXED_MESSAGE =
    '존재하지 않는 product 입니다. input = ';

  constructor(input: number) {
    super(NotExistedProductException.FIXED_MESSAGE + input);
  }
}
