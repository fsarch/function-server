import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FunctionEntity } from './function.entity.js';
import { FunctionVersion } from './function-version.entity.js';

@Entity({
  name: 'execution',
})
export class ExecutionEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__execution',
  })
  id: string;

  @Column({
    name: 'function_id',
    type: 'uuid',
    nullable: false,
  })
  functionId: string;

  @ManyToOne(() => FunctionEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'function_id' })
  function: FunctionEntity;

  @Column({
    name: 'function_version_id',
    type: 'uuid',
    nullable: true,
  })
  functionVersionId: string;

  @ManyToOne(() => FunctionVersion, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'function_version_id' })
  functionVersion: FunctionVersion;

  @Column({
    name: 'is_success',
    type: 'boolean',
    nullable: false,
  })
  isSuccess: boolean;

  @Column({
    name: 'arguments',
    type: 'jsonb',
    nullable: true,
  })
  arguments: Array<unknown>;

  @Column({
    name: 'response',
    type: 'jsonb',
    nullable: true,
  })
  response: Record<string, unknown>;

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
