import { Test, TestingModule } from '@nestjs/testing';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@lib/database';
import { Tag } from '@lib/entity';
import { TypeormTagRepository } from '@lib/infrastructure';

describe('TagService', () => {
  let service: TagService;

  beforeEach(async () => {
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
