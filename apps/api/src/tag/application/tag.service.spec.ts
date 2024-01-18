import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { Tag, TagRepository } from '@lib/entity';
import { TypeormTagRepository } from '@lib/infrastructure';
import { DataSource } from 'typeorm';
import { cleanupDB } from '@lib/support';
import { TagCreatDto } from './dto/tagCreatDto';

describe('TagService', () => {
  let service: TagService;
  let dataSource: DataSource;
  let tagRepository: TagRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(typeormConfig),
        TypeOrmModule.forFeature([Tag]),
      ],
      providers: [
        TagService,
        { provide: 'tagRepository', useClass: TypeormTagRepository },
      ],
    }).compile();

    service = module.get<TagService>(TagService);
    dataSource = module.get<DataSource>(DataSource);
    tagRepository = module.get('tagRepository');
  });

  beforeEach(async () => {
    await cleanupDB(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('tag를 저장한다.', async () => {
    // given
    const name = 'test';
    const tagCreatDto = new TagCreatDto(name);

    // when
    const savedId = await service.saveTag(tagCreatDto);
    const tag = await tagRepository.findById(savedId);

    // then
    expect(tag.name).toEqual(name);
  });

  it('같은 이름의 tag가 존재하는 경우 저장되어 있는 tag의 id를 반환한다.', async () => {
    // given
    const name = 'test';
    const savedTag = await tagRepository.save(Tag.from(name));
    const tagCreatDto = new TagCreatDto(name);

    // when
    const savedId = await service.saveTag(tagCreatDto);

    // then
    expect(savedId).toEqual(savedTag.id);
  });
});
