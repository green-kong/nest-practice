import { Bid } from '@lib/entity/bid/model/bid.entity';

describe('bid 테스트', () => {
  it('bid를 생성한다.', () => {
    // given
    const productId = 1;
    const bidPrice = 2000;

    // when
    const bid = Bid.create(productId, bidPrice);

    // then
    expect(bid.productId).toEqual(productId);
    expect(bid.getBidPriceValue()).toEqual(bidPrice);
  });
});
