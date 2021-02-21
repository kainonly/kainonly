import { getRepository } from 'typeorm';
import { Role } from '../entity/role';
import { Resource } from '../entity/resource';
import { RoleResourceRel } from '../entity/role-resource-rel';

export async function role(vars: any) {
  await getRepository(Role).insert([
    {
      key: '*',
      name: { zh_cn: '超级管理员', en_us: 'Super' },
      create_time: vars.time,
      update_time: vars.time,
    },
  ]);

  const keys = await getRepository(Resource).find({
    select: ['key'],
  });

  await getRepository(RoleResourceRel).insert(
    keys.map(v => ({
      role_key: '*',
      resource_key: v.key,
    })),
  );
}
