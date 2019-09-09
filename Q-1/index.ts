export interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}

export function parseError(err: Error): ErrorMessage {
  // implement
  let message:string = <string>err.message;
  let result:ErrorMessage = {
    message: message,
    stack: []
  }
  // 预处理：分段
  let statckArray:string[] = err.stack.split('\n')
  statckArray.forEach( statck => {
    let stackInfos:string[] = statck.trim().replace(/at\s*/, '') // 去除 chrome 与 fireFox 的区别
      .replace(/\:\d*\:\d*/, str => str.replace(/\:/g, ' ')) // 分离文件
      .split(/[@\s]/) // 拆分信息
    // 符合标准。逃逸：“http://192.168.31.8:8000/a.js:22:3”
    if (stackInfos.length === 4) {
      result.stack.push({
        line: parseInt(stackInfos[2]),
        column: parseInt(stackInfos[3]),
        filename: stackInfos[1]
      })
    }
  })
  return result
}
