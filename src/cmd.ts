import { Command } from 'commander';
import { seed, sync } from './actions';

const program = new Command();

program
  .version('1.0.0')
  .action(() => {
    program.help();
  });

program.addCommand(
  program
    .createCommand('sync')
    .description('synchronize database entities')
    .action(sync),
);

program.addCommand(
  program
    .createCommand('seed')
    .description('generate initialization data')
    .action(seed),
);

program.parse();
