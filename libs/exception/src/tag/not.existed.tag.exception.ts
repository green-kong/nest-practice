import { BadRequestException } from '@nestjs/common';

export class NotExistedTagException extends BadRequestException {
  private static readonly FIXED_MESSAGE = '존재하지 않는 tag입니다.';

  constructor() {
    super(NotExistedTagException.FIXED_MESSAGE);
  }
}
