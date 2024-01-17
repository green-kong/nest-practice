import { Tag } from '@lib/entity';
import { TypeormTagRepository } from '@lib/infrastructure';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { cleanupDB } from '@lib/support';
import { DataSource } from 'typeorm';

describe('typeORM Tag 리포지토리 테스트', () => {
  let tagRepository: TypeormTagRepository;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Tag]),
      ],
      providers: [TypeormTagRepository],
    }).compile();

    tagRepository = module.get<TypeormTagRepository>(TypeormTagRepository);
    dataSource = module.get<DataSource>(DataSource);
  });

  beforeEach(async () => {
    await cleanupDB(dataSource);
  })

  afterAll(async () => {
    await dataSource.destroy();
  })

  it('tag를 저장한다.', async () => {
    // given
    const name = 'test';
    const tag = Tag.from(name);

    // when
    const savedTag = await tagRepository.save(tag);

    // then
    expect(savedTag.id).toBeDefined();
    expect(savedTag.name).toEqual(name);
  });
});
