import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '../datatype';

@Entity()
export class Role {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '权限组代码' })
  key: string;

  @Column({ type: 'jsonb', comment: '权限组名称' })
  name: object;

  @Column({ type: 'json', default: [], comment: '特殊授权' })
  permission: object;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  note: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
