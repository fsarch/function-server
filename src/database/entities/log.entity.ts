import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ExecutionEntity } from './execution.entity.js';
import { LogLevelEntity } from './log-level.entity.js';

@Entity({
  name: 'log',
})
export class LogEntity {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'pk__log',
  })
  id: string;

  @Column({
    name: 'execution_id',
    type: 'uuid',
    nullable: false,
  })
  executionId: string;

  @ManyToOne(() => ExecutionEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'execution_id' })
  execution: ExecutionEntity;

  @Column({
    name: 'log_level_id',
    type: 'int',
    nullable: false,
    default: 0,
  })
  logLevelId: number;

  @ManyToOne(() => LogLevelEntity)
  @JoinColumn({ name: 'log_level_id' })
  logLevel: LogLevelEntity;

  @Column({
    name: 'message',
    type: 'text',
    nullable: false,
  })
  message: string;

  @Column({
    name: 'data',
    type: 'jsonb',
    nullable: true,
  })
  data: Record<string, unknown>;

  @CreateDateColumn({
    name: 'creation_time',
  })
  creationTime: Date;
}
