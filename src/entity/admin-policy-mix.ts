import { ViewEntity } from 'typeorm';
import { AdminResourceRel } from './admin-resource-rel';
import { Policy } from './policy';

@ViewEntity({
  expression: (connection => connection.createQueryBuilder()
      .select('arr.admin_id, p.acl_key')
      .addSelect('max(p.policy)', 'policy')
      .from(AdminResourceRel, 'arr')
      .innerJoin(Policy, 'p', 'arr.resource_key = p.resource_key')
      .groupBy('arr.admin_id, p.acl_key')
  ),
})
export class AdminPolicyMix {
}
