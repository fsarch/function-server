import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'function_version',
})
export class FunctionVersion {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__function_version',
  })
  id: string;

  @Column({
    name: 'function_id',
    nullable: false,
    type: 'uuid',
  })
  functionId: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
  })
  externalId: string;

  @Column({
    name: 'is_active',
    nullable: false,
    type: 'boolean',
    default: 'false',
  })
  isActive: boolean;

  @Column({
    name: 'code',
    nullable: false,
    type: 'text',
    default: "''"
  })
  code: string;

  @CreateDateColumn({
    name: 'publish_time',
    nullable: true,
  })
  publishTime?: Date;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
    nullable: true,
  })
  deletionTime: Date;
}
