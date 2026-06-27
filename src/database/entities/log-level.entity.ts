import {
  Column,
  Entity, PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'log_level',
})
export class LogLevelEntity {
  @PrimaryColumn({
    name: 'id',
    type: 'int',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '32',
    nullable: false,
  })
  name: string;
}
