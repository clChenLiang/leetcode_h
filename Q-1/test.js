// var assert = require('assert')
const { parseError } = require('./index.js')

describe('错误类型转换函数 parseError 测试', function(){
  describe('Chrome Error', function(){
    it('has equal error Stack counts', function(done){
      // 暂未实现更好的模拟报错手段，只能以 object 代替！！
      let a_chrome_error = {
        message: 'TypeError',
        stack: `TypeError: Error raised
              at bar http://192.168.31.8:8000/c.js:2:9
              at foo http://192.168.31.8:8000/b.js:4:15
              at calc http://192.168.31.8:8000/a.js:4:3
              at <anonymous>:1:11
              at http://192.168.31.8:8000/a.js:22:3
              `
      }
      let res = parseError(a_chrome_error)
      if (res.stack.length === 3) {
        done()
      } else {
        done(new Error('not get right counts of error'))
      }
    })

    it('has right filename', function(done){
      // 暂未实现更好的模拟报错手段，只能以 object 代替！！
      let a_chrome_error = {
        message: 'TypeError',
        stack: `TypeError: Error raised
              at bar http://192.168.31.8:8000/c.js:2:9
              at foo http://192.168.31.8:8000/b.js:4:15
              at calc http://192.168.31.8:8000/a.js:4:3
              at <anonymous>:1:11
              at http://192.168.31.8:8000/a.js:22:3
              `
      }
      let res = parseError(a_chrome_error)
      if (res.stack[0].filename === 'http://192.168.31.8:8000/c.js') {
        done()
      } else {
        done(new Error('not get right filename of error'))
      }
    })
  })
  describe('FireFox Error', function(){
    it('has equal error Stack counts', function(done){
      // 暂未实现更好的模拟报错手段，只能以 object 代替！！
      let a_chrome_error = {
        message: 'TypeError',
        stack: `
          bar@http://192.168.31.8:8000/c.js:2:9
          foo@http://192.168.31.8:8000/b.js:4:15
          calc@http://192.168.31.8:8000/a.js:4:3
          <anonymous>:1:11
          http://192.168.31.8:8000/a.js:22:3
          `
      }
      let res = parseError(a_chrome_error)
      if (res.stack.length === 3) {
        done()
      } else {
        done(new Error('not get right counts of error'))
      }
    })
  })
})