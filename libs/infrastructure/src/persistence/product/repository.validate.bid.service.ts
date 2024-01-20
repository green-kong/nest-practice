import { Bid, BidRepository, ValidateBidService } from '@lib/entity';
import { Inject, Injectable } from '@nestjs/common';
import { SmallerBidPriceThanLastBid } from '@lib/exception/product/smaller.bid.pice.than.last.bid';

@Injectable()
export class RepositoryValidateBidService implements ValidateBidService {
  constructor(
    @Inject('bidRepository')
    private readonly bidRepository: BidRepository,
  ) {}

  async validateBidCreate(newBid: Bid, productId: number) {
    const lastBid = await this.bidRepository.findLastBidByProductId(productId);
    if (lastBid.bidPrice.largerOrSameThan(newBid.bidPrice)) {
      throw new SmallerBidPriceThanLastBid(
        lastBid.getBidPriceValue(),
        newBid.getBidPriceValue(),
      );
    }
  }
}
