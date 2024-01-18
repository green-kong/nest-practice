import { TypeormProductRepository } from '@lib/infrastructure';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { Product, ProductTag } from '@lib/entity';
import { cleanupDB } from '@lib/support';

describe('TypeORM product 리포지토리 테스트', () => {
  let productRepository: TypeormProductRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Product]),
      ],
      providers: [TypeormProductRepository],
    }).compile();

    productRepository = module.get<TypeormProductRepository>(
      TypeormProductRepository,
    );
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await cleanupDB(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('product를 저장한다.', async () => {
    // given
    const name = 'test';
    const startPrice = 10000;
    const buyNowPrice = 20000;
    const date = new Date('2024-12-31');
    const product = Product.createNewProduct(
      name,
      startPrice,
      buyNowPrice,
      date,
      [],
    );

    // when
    const savedProduct = await productRepository.save(product);

    // then
    expect(savedProduct.id).toBeDefined();
    expect(savedProduct.getNameValue()).toEqual(name);
    expect(savedProduct.getBuyNowPriceValue()).toEqual(buyNowPrice);
    expect(savedProduct.getStartPriceValue()).toEqual(startPrice);
    expect(savedProduct.auctionEndDate).toEqual(date);
  });

  it('저장된 product를 조회한다.', async () => {
    // given
    const name = 'test';
    const startPrice = 10000;
    const buyNowPrice = 20000;
    const date = new Date('2024-12-31');
    const product = Product.createNewProduct(
      name,
      startPrice,
      buyNowPrice,
      date,
      [],
    );
    const savedProduct = await productRepository.save(product);

    // when
    const foundProduct = await productRepository.findById(savedProduct.id);

    // then
    expect(savedProduct).toEqual(foundProduct);
  });

  it('product 저장 시 productCategory도 함께 저장된다.', async () => {
    // given
    const productTag1 = ProductTag.from(1);
    const productTag2 = ProductTag.from(2);
    const name = 'test';
    const startPrice = 10000;
    const buyNowPrice = 20000;
    const date = new Date('2024-12-31');
    const product = Product.createNewProduct(
      name,
      startPrice,
      buyNowPrice,
      date,
      [productTag1, productTag2],
    );

    // when
    const savedProduct = await productRepository.save(product);

    // then
    expect(savedProduct.productTags).toHaveLength(2);
  });

  it('저장된 product를 id를 통해 삭제한다.', async () => {
    // given
    const productTag1 = ProductTag.from(1);
    const productTag2 = ProductTag.from(2);
    const name = 'test';
    const startPrice = 10000;
    const buyNowPrice = 20000;
    const date = new Date('2024-12-31');
    const product = Product.createNewProduct(
      name,
      startPrice,
      buyNowPrice,
      date,
      [productTag1, productTag2],
    );
    const savedProduct = await productRepository.save(product);

    // when
    await productRepository.deleteById(savedProduct.id);
    const foundProduct = await productRepository.findById(savedProduct.id);

    // then
    expect(foundProduct).toBeNull();
  });
});
