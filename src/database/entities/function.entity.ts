import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'function',
})
export class FunctionEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__function',
  })
  id: string;

  @Column({
    name: 'name',
    length: '512',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'external_id',
    type: 'varchar',
    length: '256',
  })
  externalId: string;

  @Column({
    name: 'enable_debug_logging',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  enableDebugLogging: boolean;

  @Column({
    name: 'enable_error_logging',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  enableErrorLogging: boolean;

  @Column({
    name: 'retention_time_seconds',
    type: 'int',
    nullable: false,
    default: 3600,
  })
  retentionTimeSeconds: number;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;

  @DeleteDateColumn({
    name: 'deletion_time',
  })
  deletionTime: Date;
}
