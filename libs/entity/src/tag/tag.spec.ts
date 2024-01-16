import { TagNameLengthException } from '@lib/exception';
import { Tag } from '@lib/entity/tag/tag';

describe('tag 테스트', () => {
  it('tag를 생성한다.', () => {
    // given
    const name = '강아지';

    // when
    const tag = Tag.from(name);

    // then
    expect(tag.name).toEqual(name);
  });

  test.each([[undefined], [null], [''], ['a']])(
    '태그명이 입력되지 않거나, 2글자 미만인 경우 예외가 발생한다.',
    (invalidValue: string) => {
      // when & then
      expect(() => {
        Tag.from(invalidValue);
      }).toThrow(TagNameLengthException.smallerThanMinimumLength(invalidValue,2));
    },
  );

  it('태그명이 10글자를 초과하는 경우 예외가 발생한다.', () => {
    // given
    const invalidValue = '열글자가넘는태그만들기';

    // when & then
    expect(() => {
      Tag.from(invalidValue);
    }).toThrow(TagNameLengthException.biggerThanMaximumLength(invalidValue, 10));
  });
});
