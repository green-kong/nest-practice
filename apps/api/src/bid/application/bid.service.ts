import { Inject, Injectable } from '@nestjs/common';
import { Bid, BidRepository, ProductRepository } from '@lib/entity';
import { BidCreateDto } from './dto/bidCreateDto';
import { NotExistedProductException } from '@lib/exception';

@Injectable()
export class BidService {
  constructor(
    @Inject('bidRepository')
    private readonly bidRepository: BidRepository,
    @Inject('productRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async saveBid(bidCreateDto: BidCreateDto): Promise<number> {
    const bid = await this.createBid(bidCreateDto);
    const savedBid = await this.bidRepository.save(bid);
    return savedBid.id;
  }

  private async createBid(bidCreateDto: BidCreateDto): Promise<Bid> {
    const productId = bidCreateDto.productId;
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new NotExistedProductException(productId);
    }
    return product.createBid(bidCreateDto.productId, bidCreateDto.bidPrice);
  }
}
