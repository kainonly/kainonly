import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Id } from '../datatype';
import { Admin } from './admin';
import { Resource } from './resource';

@Entity()
@Unique(['admin_id', 'resource_key'])
export class AdminResourceRel {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @ManyToOne(() => Admin, value => value.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_id', referencedColumnName: 'id' })
  admin_id: number;

  @ManyToOne(() => Resource, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_key', referencedColumnName: 'key' })
  resource_key: string;
}
