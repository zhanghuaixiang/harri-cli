#!/usr/bin/env node
const program = require('commander');
const setHelpOptions = require('../lib/core/help');
const createCommander = require('../lib/core/create');
// 设置版本号
program.version(require('../package.json').version);
// 帮助和可选信息
setHelpOptions();
// 创建其他指令
createCommander();
program.parse(process.argv);
