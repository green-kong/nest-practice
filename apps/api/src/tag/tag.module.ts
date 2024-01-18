import { Module } from '@nestjs/common';
import { TagService } from './application/tag.service';

@Module({
  providers: [TagService]
})
export class TagModule {}
