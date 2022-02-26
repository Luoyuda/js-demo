const program = require('commander')
const getHelp = () => {}

program
  .name('u can u up')
  .version('0.0.1')
  .option('-v, --verbose', 'vvvvv')

program
  .command('clone <source> [dest]')
  .option('-d, --depth <level>', 'git clone')
  .description('dessss')
  .action((...args) => {
    console.log(args)
  })

program.parse(process.argv)