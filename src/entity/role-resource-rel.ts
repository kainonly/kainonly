import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Id } from '../datatype';
import { Role } from './role';
import { Resource } from './resource';

@Entity()
@Unique(['role_key', 'resource_key'])
export class RoleResourceRel {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @ManyToOne(() => Role, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_key', referencedColumnName: 'key' })
  role_key: string;

  @ManyToOne(() => Resource, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'resource_key', referencedColumnName: 'key' })
  resource_key: string;

}
