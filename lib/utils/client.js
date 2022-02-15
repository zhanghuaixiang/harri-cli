const { spawn } = require("child_process");
const { resolve } = require("path");

let commandSpawn = (...args) => {
    return new Promise((resolve, reject) => {
        const childProcess = spawn(...args);
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
        childProcess.on("close", (statu) => {
            if (statu == 0) {
                resolve();
            } else {
                reject();
            }
        });
    });
};
module.exports = {
    commandSpawn
};
