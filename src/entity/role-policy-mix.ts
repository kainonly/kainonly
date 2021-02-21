import { ViewEntity } from 'typeorm';
import { RoleResourceRel } from './role-resource-rel';
import { Policy } from './policy';

@ViewEntity({
  expression: (connection => connection.createQueryBuilder()
      .select('rrr.role_key,p.acl_key')
      .addSelect('max(p.policy)', 'policy')
      .from(RoleResourceRel, 'rrr')
      .innerJoin(Policy, 'p', 'rrr.resource_key = p.resource_key')
      .groupBy('rrr.role_key,p.acl_key')
  ),
})
export class RolePolicyMix {
}
