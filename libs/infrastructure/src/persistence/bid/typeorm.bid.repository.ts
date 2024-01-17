import { Bid, BidRepository } from '@lib/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class TypeormBidRepository implements BidRepository {
  constructor(
    @InjectRepository(Bid)
    private readonly bids: Repository<Bid>,
  ) {}

  async save(bid: Bid): Promise<Bid> {
    return this.bids.save(bid);
  }

  async findById(id: number): Promise<Bid> {
    return await this.bids.findOneBy({ id });
  }

  async findLastBidByProductId(productId: number): Promise<Bid> {
    return await this.bids
      .createQueryBuilder('bid')
      .where('bid.productId = :productId', { productId })
      .orderBy('bid.createdAt', 'DESC')
      .getOne();
  }
}
