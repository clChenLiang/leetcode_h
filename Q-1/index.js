"use strict";
exports.__esModule = true;
function parseError(err) {
    // implement
    var message = err.message;
    var result = {
        message: message,
        stack: []
    };
    // 预处理：分段
    var statckArray = err.stack.split('\n');
    statckArray.forEach(function (statck) {
        var stackInfos = statck.replace(/\s*at\s*/, '') // 去除 chrome 与 fireFox 的区别
            .replace(/\:\d\:\d/, function (str) { return str.replace(/\:/g, ' '); }) // 分离文件
            .split(/[@\s]/); // 拆分信息
        // 符合标准。逃逸：“http://192.168.31.8:8000/a.js:22:3”
        if (stackInfos.length === 4) {
            result.stack.push({
                line: parseInt(stackInfos[2]),
                column: parseInt(stackInfos[3]),
                filename: stackInfos[1]
            });
        }
    });
    return result;
}
exports.parseError = parseError;
