import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '../datatype';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '特殊授权代码' })
  key: string;

  @Column({ type: 'jsonb', comment: '特殊授权名称' })
  name: object;

  @Column({ type: 'text', nullable: true, comment: '备注' })
  note: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
