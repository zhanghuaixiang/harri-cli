const program = require('commander');

module.exports = () => {
    program.option('-d --dest <dest>', 'a destination folder 例如：-d /src/components');
};
