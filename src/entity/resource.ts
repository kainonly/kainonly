import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Id, Timestamp } from '../datatype';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn(Id)
  id: number;

  @Column({ length: 200, unique: true, comment: '资源控制代码' })
  key: string;

  @Column({ length: 200, default: 'origin', comment: '资源键父节点' })
  parent: string;

  @Column({ type: 'jsonb', comment: '资源控制名称' })
  name: object;

  @Column({ type: 'boolean', default: false, comment: '是否为导航（中后台菜单显示）' })
  nav: boolean;

  @Column({ type: 'boolean', default: false, comment: '是否为路由（映射前端路由地址）' })
  router: boolean;

  @Column({ type: 'boolean', default: false, comment: '是否为策略节点（可关联访问控制）' })
  policy: boolean;

  @Column({ length: 200, nullable: true, comment: '字体图标' })
  icon: string;

  @Column({ type: 'int4', default: 0, comment: '排序' })
  sort: number;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column(Timestamp)
  create_time: number;

  @Column(Timestamp)
  update_time: number;
}
