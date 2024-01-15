import { Money } from '@lib/entity';
import { InsufficientAmountException, InvalidDenominationException } from '@lib/exception';

describe('money 테스트', () => {
  it('money를 생성한다.', () => {
    // given
    const value = 1000;

    // when
    const money = Money.from(value);

    // then
    expect(money.value).toEqual(value);
  });

  test.each([[undefined], [null], [900]])(
    'value가 1000미만인 경우 예외가 발생한다.',
    (invalidValue: number) => {
      // when & then
      expect(() => {
        Money.from(invalidValue);
      }).toThrow(new InsufficientAmountException(1000, invalidValue));
    },
  );

  it('10원으로 나누어 떨어지지 않는 경우 예외가 발생한다.', () => {
    // given
    const invalidValue = 1001;

    // when & then
    expect(() => {
      Money.from(invalidValue);
    }).toThrow(new InvalidDenominationException(invalidValue));
  });

  test.each([[2000, 1000, true],[1000, 1000, true],[1000, 2000, false],])(
      '비교하는 Money보다 크거나 같은 경우 true를 반환한다.',
      (value1: number, value2:number, expected:boolean) => {
        // given
        const money1 = Money.from(value1);
        const money2 = Money.from(value2);

        // when
        const result = money1.largerOrSameThan(money2);
        
        // then
        expect(result).toEqual(expected);
      },
    );
});
