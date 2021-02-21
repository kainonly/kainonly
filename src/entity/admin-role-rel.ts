import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Id } from '../datatype';
import { Admin } from './admin';
import { Role } from './role';

@Entity()
export class AdminRoleRel {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @ManyToOne(() => Admin, value => value.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'admin_id', referencedColumnName: 'id' })
  admin_id: number;

  @ManyToOne(() => Role, value => value.key, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_key', referencedColumnName: 'key' })
  role_key: string;
}
