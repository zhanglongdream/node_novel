const cp = require('child_process')
const {
  resolve
} = require('path')


module.exports = () => {
  return new Promise((resolves, reject) => {
    let invoked = false
    let script = resolve(__dirname, '../crawler/novel_title_list.js')
    let child = cp.fork(script, [])
    child.on('error', err => {
      if (invoked) return
      invoked = true
      reject(err)
    })
    child.on('exit', code => {
      if (invoked) return
      invoked = true
      let err = code === 0 ? null : code
      reject(err)
    })
    child.on('message', data => {
      resolves(data)
    })
  })

}