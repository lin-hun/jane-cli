let compiler = require('node-sass')
let fs = require('fs')
let utils = require('../../utils/utils')
let config = utils.getProjectConfig().css.config
let log = utils.log
let projectConfig = utils.getProjectConfig()

// option:https://github.com/sass/node-sass
module.exports = (path) => {
  let output = utils.getOutputFile(path.replace(projectConfig.css.ext, '.wxss'))
  let option = Object.assign({file: path}, config)
  // option.outFile = `${output}` // for map
  compiler.render(option, (err, result) => {
    if (err) {
      log.error(err)
      return
    }
    // // write in .map
    // utils.write(`${option.outFile}.map`, result.map).then(v => {
    //   log.tag('写入sourceMap',`${option.outFile}.map`)
    // }).catch((err) => {
    //   log.error(err)
    // })
    // write in file
    utils.write(output, result.css).then(v => {
      log.tag('写入css',`${utils.getOutputFile(output)}`)
    }).catch((err) => {
      log.error(err)
    })
  })
}
