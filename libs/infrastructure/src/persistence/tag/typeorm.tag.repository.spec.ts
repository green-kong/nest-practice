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

  it('같은 이름의 tag가 존재하는 경우 예외가 발생한다.', async () => {
    // given
    const name = 'test';
    const tag = Tag.from(name);
    await tagRepository.save(tag);

    // when & then
    const duplicatedNameTag = Tag.from(name);
    await expect(tagRepository.save(duplicatedNameTag)).rejects.toThrow();
  });

  it('id를 통해 저장된 tag를 조회한다.', async () => {
    // given
    const name = 'test';
    const tag = Tag.from(name);
    const savedTag = await tagRepository.save(tag);

    // when
    const foundTag = await tagRepository.findById(savedTag.id);

    // then
    expect(foundTag).toEqual(savedTag);
  });

  it('name을 통해 저장된 tag를 조회한다.', async () => {
    // given
    const name = 'test';
    const tag = Tag.from(name);
    const savedTag = await tagRepository.save(tag);

    // when
    const foundTag = await tagRepository.findByName(name);

    // then
    expect(foundTag).toEqual(savedTag);
  });

  it('저장된 tag를 id를 통해 삭제한다.', async () => {
    // given
    const name = 'test';
    const tag = Tag.from(name);
    const savedTag = await tagRepository.save(tag);

    // when
    await tagRepository.deleteById(savedTag.id);
    const foundTag = await tagRepository.findById(savedTag.id);

    // then
    expect(foundTag).toBeNull();
  });
});
