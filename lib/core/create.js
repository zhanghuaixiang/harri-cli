const program = require("commander");
const { createProjectAction, addComponentAction, addPageAndRouter } = require("./actions");
module.exports = () => {
    // 创建项目
    program.command("create <project> [others...]").description("create your project").action(createProjectAction);

    // 新增vue组件/创建vue组件
    program
        .command("addcpn <cpnName>")
        .description("add a vue component, example: harri addcpm HelloWord")
        .action((cpnName) => {
            addComponentAction(cpnName, program.dest || "src/components");
        });

    // 新增功能组件及路由
    program
        .command("addpage <pageName>")
        .description("add a vue component, example: harri addcpm HelloWord")
        .action((pageName) => {
            addPageAndRouter(pageName, program.dest || "src/pages");
        });
};
