import { createConnection } from 'typeorm';
import { acl } from './seed/acl';
import { resource } from './seed/resource';
import { policy } from './seed/policy';
import { permission } from './seed/permission';
import { role } from './seed/role';
import { admin } from './seed/admin';

export const sync = async () => {
  const connection = await createConnection();
  await connection.synchronize(true);
  await connection.close();
};

export const seed = async () => {
  const connection = await createConnection();
  const vars = {
    time: Math.floor(new Date().getTime() / 1000),
  };
  await acl(vars);
  await resource(vars);
  await policy(vars);
  await permission(vars);
  await role(vars);
  await admin(vars);
  await connection.close();
};
