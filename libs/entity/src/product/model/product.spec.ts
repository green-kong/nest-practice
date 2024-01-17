import { Product } from '@lib/entity/product/model/product.entity';
import { InvalidAuctionEndDateException, InvalidPricingException } from '@lib/exception';

describe('product 테스트', () => {
  it('product를 생성한다.', () => {
    // given
    const name = '테스트상품';
    const startPrice = 1000;
    const buyNowPrice = 2000;
    const auctionEndDate = new Date('2024-01-26');

    // when
    const product = Product.createNewProduct(name, startPrice, buyNowPrice, auctionEndDate);

    // then
    expect(product.getNameValue()).toEqual(name);
    expect(product.getStartPriceValue()).toEqual(startPrice);
    expect(product.getBuyNowPriceValue()).toEqual(buyNowPrice);
    expect(product.auctionEndDate).toEqual(auctionEndDate);
  });

  it('buyNowPrice보다 startPrice가 크거가 같은 경우 예외가 발생한다.', () => {
    // given
    const name = '테스트상품';
    const startPrice = 2000;
    const buyNowPrice = 2000;
    const auctionEndDate = new Date('2024-01-26');

    // when & then
    expect(() => {
      Product.createNewProduct(name, startPrice, buyNowPrice, auctionEndDate);
    }).toThrow(new InvalidPricingException(startPrice, buyNowPrice));
  });

  it('auctionEndDate가 현재시간보다 이전의 날짜인 경우 예외가 발생한다.', () => {
    // given
    const name = '테스트상품';
    const startPrice = 1000;
    const buyNowPrice = 2000;
    const auctionEndDate = new Date('2022-01-26');

    // when & then
    expect(() => {
      Product.createNewProduct(name, startPrice, buyNowPrice, auctionEndDate);
    }).toThrow(new InvalidAuctionEndDateException(auctionEndDate));
  });
});
