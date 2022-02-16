const ejs = require("ejs");
const path = require("path");
const fs = require("fs");

// 编译函数，将模板编译成字符串
const compile = (templateName, data) => {
    return new Promise((resolve, reject) => {
        const relativePath = `../templates/${templateName}`;
        const templatePath = path.resolve(__dirname, relativePath);
        ejs.renderFile(templatePath, data, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
};
// 创建文件目录
const createFile = (filePath) => {
    const parentDir = path.dirname(filePath);
    if (fs.existsSync(parentDir)) {
        return true;
    } else {
        if (createFile(parentDir)) {
            fs.mkdirSync(parentDir);
            return true;
        }
    }
};
// 将内容写进文件
const writeToFile = (filePath, content) => {
    if (createFile(filePath)) {
        return fs.promises.writeFile(filePath, content);
    }
};
module.exports = {
    compile,
    writeToFile
};
