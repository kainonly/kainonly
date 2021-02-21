import { PrimaryGeneratedColumnNumericOptions } from 'typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions';
import { ColumnOptions } from 'typeorm';

export const Id: PrimaryGeneratedColumnNumericOptions = {
  type: 'bigint',
};

export const Timestamp: ColumnOptions = {
  type: 'bigint',
  default: 0,
};


