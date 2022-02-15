const program = require('commander');
const { createProjectAction } = require('./actions');
module.exports = () => {
    program
        .command('create <project> [others...]')
        .description('create your project')
        .action(createProjectAction);
};
