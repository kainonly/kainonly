import { ViewEntity } from 'typeorm';
import { Role } from './role';
import { RoleResourceRel } from './role-resource-rel';
import { RolePolicyMix } from './role-policy-mix';

@ViewEntity({
  expression: (connection => connection.createQueryBuilder()
      .select('r.id,r.key,r.name')
      .addSelect(
        `case when count(rrr.resource_key) = 0 then '[]'::json
         else json_agg(distinct rrr.resource_key) end`,
        'resource',
      )
      .addSelect(
        `case when count(rpm.acl_key) = 0 then '[]'::json 
        else json_agg(distinct concat(rpm.acl_key, ':', rpm.policy)) end`,
        'acl',
      )
      .addSelect('r.permission,r.note,r.status,r.create_time,r.update_time')
      .from(Role, 'r')
      .leftJoin(RoleResourceRel, 'rrr', 'r.key = rrr.role_key')
      .leftJoin(RolePolicyMix, 'rpm', 'r.key = rpm.role_key')
      .groupBy('r.id')
  ),
})
export class RoleMix {
}
