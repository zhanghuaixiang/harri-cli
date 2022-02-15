# 总结

## 设置脚手架命令：
    `package.json`中设置`bin`属性。然后通过`npm link`创建脚手架命令。

## 核心：
    const program = require("commander")

## 设置 version：
    program.version(xxxxx)

## 设置帮助指令：
    `program.option("-d dest <dest>")`，可以从命令中获取尖括号中的参数。

## 创建命令：
    program.command("create <project>").action(project=>{})

## 创建项目：
    1、从远程仓库clone项目。
        使用download-git-repo插件中提供的download方法，可直接从github上clone代码至本地。
    
    2、对clone下来的项目安装依赖。执行npm install。
        使用nodejs中的child_process中的spawn执行命令。spawn("npm", ["install"], {cwd: "./创建的项目名称"})
    3、安装完依赖进行启动项目。执行npm run serve。
        同样使用spawn来执行命令。spawn("npm", ["run", "serve"], {cwd: "./创建的项目名称"})
    4、打开浏览器。
        使用open插件提供的open方法，将本地服务地址传进去。open("http://localhost:8080")
