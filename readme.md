设置脚手架命令：`package.json`中设置`bin`属性。然后通过`npm link`创建脚手架命令。

核心：`const program = require("commander")`

设置 version：`program.version(xxxxx)`

设置帮助指令：`program.option("-d dest <dest>")`，可以从命令中获取尖括号中的参数。

创建命令：`program.command("create <project>").action(project=>{})`

