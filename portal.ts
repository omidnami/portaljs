import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .version('1.0.0')
  .description('CLI for creating models with portaljs cli')

  //make model
program
  .command('make:model <name> using <sql>')
  .description('Create a new model')
  .action((name, using, sql) => {
    const modelName = name.charAt(0).toUpperCase() + name.slice(1)
    const sqlType = sql
    const connection = sqlType + 'Connection'
    const dbName = name
    const modelContent = `
import { BaseModel } from "../app/database/${sqlType}/BaseModel";
import { ${connection} } from "../configs/database";
class ${modelName} extends BaseModel  {
  constructor() {
    ${connection}()
    super("${dbName}");
  }
}

export default ${modelName};
`;

    const modelDir = path.join(__dirname, 'models');
    if (!fs.existsSync(modelDir)) {
      fs.mkdirSync(modelDir);
    }

    const modelPath = path.join(modelDir, `${modelName}Model.ts`);
    fs.writeFileSync(modelPath, modelContent.trim());
    console.log(`Model ${modelName} created successfully at ${modelPath} using ${sqlType}`);
  });

  //make controller
program
  .command('controller')
  .description('Description for controller')
  .action(() => {
    console.log('Executing controller');
});

//make module
program
  .command('module')
  .description('Description for module')
  .action(() => {
    console.log('Executing module');
});

//make queue

program
  .command('queue')
  .description('Description for queue')
  .action(() => {
    console.log('Executing queue');
});

//make interface
program
  .command('interface')
  .description('Description for interface')
  .action(() => {
    console.log('Executing interface');
});

//make middleware
program
  .command('middleware')
  .description('Description for middleware')
  .action(() => {
    console.log('Executing middleware');
});

//make router
program
  .command('router')
  .description('Description for router')
  .action(() => {
    console.log('Executing router');
});

//make socket_service
program
  .command('socket_service')
  .description('Description for socket_service')
  .action(() => {
    console.log('Executing socket_service');
});
  program.parse(process.argv);

