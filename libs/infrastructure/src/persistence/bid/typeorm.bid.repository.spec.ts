import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { Bid } from '@lib/entity';
import { TypeormBidRepository } from '@lib/infrastructure/persistence/bid/typeorm.bid.repository';
import { DataSource } from 'typeorm';
import { cleanupDB } from '@lib/support';

describe('TypeORM BID 리포지토리 테스트', () => {
  let bidRepository: TypeormBidRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Bid]),
      ],
      providers: [TypeormBidRepository],
    }).compile();

    bidRepository =
      testingModule.get<TypeormBidRepository>(TypeormBidRepository);
    dataSource = testingModule.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await cleanupDB(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('bid를 저장한다.', async () => {
    // given
    const productId = 1;
    const bidPrice = 3000;
    const bid = Bid.create(productId, bidPrice);

    // when
    const savedBid = await bidRepository.save(bid);

    // then
    expect(savedBid.id).toBeDefined();
    expect(savedBid.productId).toEqual(productId);
    expect(savedBid.getBidPriceValue()).toEqual(bidPrice);
  });

  it('저장된 Bid를 id를 통해 조회한다.', async () => {
    // given
    const productId = 1;
    const bidPrice = 3000;
    const bid = Bid.create(productId, bidPrice);
    const savedBid = await bidRepository.save(bid);

    // when
    const foundBid = await bidRepository.findById(savedBid.id);

    // then
    expect(foundBid).toEqual(savedBid);
  });

  it('productId를 통해 가장 최근에 저장된 bid를 조회한다.', async () => {
    // given
    const productId = 1;
    const bid1 = await bidRepository.save(Bid.create(productId, 2000));
    const bid2 = await bidRepository.save(Bid.create(productId, 3000));
    const bid3 = await bidRepository.save(Bid.create(productId, 4000));
    const bid4 = await bidRepository.save(Bid.create(productId, 5000));
    const bid5 = await bidRepository.save(Bid.create(productId, 6000));

    // when
    const lastBid = await bidRepository.findLastBidByProductId(productId);

    // then
    expect(lastBid).toEqual(bid5);
  });
});
