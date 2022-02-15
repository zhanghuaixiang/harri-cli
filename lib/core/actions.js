const colors = require("colors");
// 将回调函数方法转换为promise  callback--->promise
const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const { vueRepo } = require("../config/repo.config");
const { commandSpawn } = require("../utils/client");
const open = require("open");

// promise---> async await
const createProjectAction = async (project) => {
    console.log(colors.yellow("harri is creating your project~"));
    try {
        // 1.clone项目
        await download(vueRepo, project, { clone: true });
        // 2.执行npm install
        const command = process.platform == "win32" ? "npm.cmd" : "npm";
        await commandSpawn(command, ["install"], { cwd: `./${project}` });
        // 3.执行npm run dev
        commandSpawn(command, ["run", "serve"], { cwd: `./${project}` });
        // 4.打开浏览器
        open("http://localhost:8080");
    } catch (e) {
        console.log(colors.red(e));
    }
};

module.exports = {
    createProjectAction
};
