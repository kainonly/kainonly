import { ViewEntity } from 'typeorm';
import { Admin } from './admin';
import { AdminRoleRel } from './admin-role-rel';
import { AdminResourceRel } from './admin-resource-rel';
import { AdminPolicyMix } from './admin-policy-mix';

@ViewEntity({
  expression: (connection => connection.createQueryBuilder()
      .select('a.id,a.username,a.password')
      .addSelect(`json_agg(distinct arr.role_key)`, 'role')
      .addSelect(`json_agg(distinct arer.resource_key)`, 'resource')
      .addSelect(`json_agg(distinct concat(apm.acl_key, ':', apm.policy))`, 'acl')
      .addSelect('a.permission, a.call,a.email, a.phone,a.avatar,a.status,a.create_time,a.update_time')
      .from(Admin, 'a')
      .innerJoin(AdminRoleRel, 'arr', 'a.id = arr.admin_id')
      .leftJoin(AdminResourceRel, 'arer', 'a.id = arer.admin_id')
      .leftJoin(AdminPolicyMix, 'apm', 'a.id = apm.admin_id')
      .groupBy('a.id, a.username, a.password, a.permission, a.call, a.email, a.phone, a.avatar, a.status, a.create_time, a.update_time')
  ),
})
export class adminMix {
}
