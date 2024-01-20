import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { Bid, BidRepository } from '@lib/entity';
import { TypeormBidRepository } from '@lib/infrastructure/persistence/bid/typeorm.bid.repository';
import { RepositoryValidateBidService } from '@lib/infrastructure/persistence/product/repository.validate.bid.service';
import { SmallerBidPriceThanLastBid } from '@lib/exception';
import { cleanupDB } from '@lib/support';
import { DataSource } from 'typeorm';

describe('bid repository 방식 validate 테스트', () => {
  let validateBidService: RepositoryValidateBidService;
  let bidRepository: BidRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Bid]),
      ],
      providers: [
        { provide: 'bidRepository', useClass: TypeormBidRepository },
        RepositoryValidateBidService,
      ],
    }).compile();

    bidRepository = testingModule.get('bidRepository');
    validateBidService = testingModule.get<RepositoryValidateBidService>(
      RepositoryValidateBidService,
    );
    dataSource = testingModule.get<DataSource>(DataSource);
  });

  afterEach(async () => {
    await cleanupDB(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  test.each([[2500], [2000]])(
    'product의 마지막 입찰가격과 새로운 입찰가격을 비교하여 현재 입찰가격이 낮거나 같은 경우 예외가 발생한다.',
    async (invalidBidPrice: number) => {
      // given
      const productId = 1;
      const lastBidPrice = 2500;
      await bidRepository.save(Bid.create(productId, lastBidPrice));
      const newBid = Bid.create(productId, invalidBidPrice);

      // when & then
      await expect(
        validateBidService.validateBidCreate(newBid, productId),
      ).rejects.toThrow(
        new SmallerBidPriceThanLastBid(lastBidPrice, invalidBidPrice),
      );
    },
  );
});
