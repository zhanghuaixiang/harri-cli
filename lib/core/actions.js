const colors = require('colors');
// 将回调函数方法转换为promise  callback--->promise
const { promisify } = require('util');
const download = promisify(require('download-git-repo'));
const { vueRepo } = require('../config/repo.config');

// promise---> async await
const createProjectAction = async project => {
    // 1.clone项目
    console.log(colors.yellow(vueRepo));
    try {
        await download(vueRepo, project, { clone: true });
    } catch (error) {
        console.log(colors.red(error));
    }

    // 2.执行npm install
    // 3.执行npm run dev
    // 4.打开浏览器
};

module.exports = {
    createProjectAction,
};
