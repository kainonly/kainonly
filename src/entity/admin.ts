import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '../datatype';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 50, unique: true, comment: '用户名' })
  username: string;

  @Column({ type: 'text', comment: '用户密码' })
  password: string;

  @Column({ type: 'json', default: [], comment: '特殊授权' })
  permission: object;

  @Column({ length: 200, nullable: true, comment: '电子邮件' })
  email: string;

  @Column({ length: 20, nullable: true, comment: '联系电话' })
  phone: string;

  @Column({ length: 20, nullable: true, comment: '称呼' })
  call: string;

  @Column({ type: 'text', nullable: true, comment: '头像' })
  avatar: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
