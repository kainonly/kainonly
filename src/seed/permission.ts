import { getRepository } from 'typeorm';
import { Permission } from '../entity/permission';

export async function permission(vars: any) {
  await getRepository(Permission).insert([]);
}
