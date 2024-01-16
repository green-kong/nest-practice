import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TagNameLengthException } from '@lib/exception';

@Entity()
export class Tag {
  private static readonly MINIMUM_LENGTH = 2;
  private static readonly MAXIMUM_LENGTH = 10;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  static from(name: string): Tag {
    this.validate(name);
    const tag = new Tag();
    tag.name = name;
    return tag;
  }

  private static validate(value: string) {
    if (!value || value.length < this.MINIMUM_LENGTH) {
      throw TagNameLengthException.smallerThanMinimumLength(
        value,
        this.MINIMUM_LENGTH,
      );
    }

    if (value.length > this.MAXIMUM_LENGTH) {
      throw TagNameLengthException.biggerThanMaximumLength(
        value,
        this.MAXIMUM_LENGTH,
      );
    }
  }
}
