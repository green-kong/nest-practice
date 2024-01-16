import { BadRequestException } from '@nestjs/common';

export class TagNameLengthException extends BadRequestException {
  private static readonly MINIMUM_LENGTH_FIXED_MESSAGE =
    '태그는 minimumLength 이상이어야 합니다.';
  private static readonly MAXIMUM_LENGTH_FIXED_MESSAGE =
    '태그는 maximum length 미만이어야 합니다.';

  constructor(message: string) {
    super(message);
  }

  static smallerThanMinimumLength(
    input: string,
    minimumLength: number,
  ): TagNameLengthException {
    const message = `${this.MINIMUM_LENGTH_FIXED_MESSAGE} input = ${input}, minimumLength = ${minimumLength}`;
    return new TagNameLengthException(message);
  }

  static biggerThanMaximumLength(
    input: string,
    maximumLength: number,
  ): TagNameLengthException {
    const message = `${this.MAXIMUM_LENGTH_FIXED_MESSAGE} input = ${input}, maximumLength = ${maximumLength}`;
    return new TagNameLengthException(message);
  }
}
