import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '../datatype';

@Entity()
export class Acl {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '访问控制代码' })
  key: string;

  @Column({ type: 'jsonb', comment: '访问控制名称' })
  name: object;

  @Column({ type: 'json', default: [], comment: '写入控制项' })
  write: object;

  @Column({ type: 'json', default: [], comment: '读取控制项' })
  read: object;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
