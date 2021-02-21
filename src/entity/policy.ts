import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { Id } from '../datatype';
import { Resource } from './resource';
import { Acl } from './acl';

@Entity()
@Unique(['resource_key', 'acl_key'])
export class Policy {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @ManyToOne(() => Resource, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_key', referencedColumnName: 'key' })
  resource_key: string;

  @ManyToOne(() => Acl, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'acl_key', referencedColumnName: 'key' })
  acl_key: string;

  @Column({ type: 'int2', default: 0, comment: '读写策略（0为只读,1为读写）' })
  policy: number;
}
