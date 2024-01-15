import { ProductName } from '@lib/entity/product/product.name';
import { ProductNameException } from '@lib/exception';

describe('productName 테스트', () => {
  it('productName을 생성한다.', () => {
    // given
    const value = 'test 상품명';

    // when
    const productName = ProductName.from(value);

    // then
    expect(productName.value).toEqual(value);
  });

  test.each([[undefined], [null], [''], ['a']])(
    'product name이 입력되지 않거나, 두글자 이하인 경우 예외가 발생한다.',
    (invalidValue: string) => {
      // when & then
      expect(() => {
        ProductName.from(invalidValue);
      }).toThrow(ProductNameException.minimumLengthException(2));
    },
  );

  it('30글자가 넘어가는 상품명을 생성하면예외가 발생한다.', () => {
    // given
    const invalidValue =
      '서른글자가넘어가는상품명이입력되는경우예외가발생하는상품명이다';

    // when & then
    expect(invalidValue.length).toEqual(31);
    expect(() => {
      ProductName.from(invalidValue);
    }).toThrow(ProductNameException.maximumLengthException(30));
  });
});
