const colors = require("colors");
// 将回调函数方法转换为promise  callback--->promise
const { promisify } = require("util");
const download = promisify(require("download-git-repo"));
const open = require("open");
const path = require("path");
const { vueRepo } = require("../config/repo.config");
const { commandSpawn } = require("../utils/client");
const { compile, writeToFile } = require("../utils/utils");

/**
 * 创建项目工程
 * @param {*} project 工程名称
 */
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

/**
 * 新增组件
 * @param {*} name 组件名称
 * @param {*} dest 组件生成目录 program.dest||'src/components'
 */
const addComponentAction = async (name, dest) => {
    try {
        // 1、导入建立的模板ejs
        const templateName = "vue.component.ejs";
        // 2、渲染模板
        const result = await compile(templateName, {
            data: {
                name,
                lowerName: name.toLowerCase()
            }
        });
        // 3、写入.vue文件至目标目录
        writeToFile(path.resolve(dest, `${name}.vue`), result);
    } catch (error) {
        console.log(colors.red(error));
    }
};

/**
 * 创建业务组件及路由
 * @param {*} name
 */
const addPageAndRouter = async (name, dest) => {
    try {
        const data = { data: { name, lowerName: name.toLowerCase() } };
        // 1、渲染模板
        const pageResult = await compile("vue.component.ejs", data);
        const routerResult = await compile("vue.router.ejs", data);
        console.log(path.resolve(dest, `${data.lowerName}/${name}.vue`));
        // 2、写入.vue文件至目标目录
        await writeToFile(path.resolve(dest, `${name.toLowerCase()}/${name}.vue`), pageResult);
        // 3、写入路由文件
        writeToFile(path.resolve(dest, `${name.toLowerCase()}/router.js`), routerResult);
    } catch (error) {
        console.log(colors.red(error));
    }
};

module.exports = {
    createProjectAction,
    addComponentAction,
    addPageAndRouter
};
