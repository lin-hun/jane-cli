let compiler = require('node-sass')
let fs = require('fs')
let fse = require('fs-extra')
let utils = require('../../utils/utils')
let config = utils.getProjectConfig().css.config
let log = utils.log
let projectConfig = utils.getProjectConfig()

// option:https://github.com/sass/node-sass
module.exports = async (path) => {
  let output = utils.getOutputFile(path.replace(projectConfig.css.ext, '.wxss'))
  let option = Object.assign({file: path}, config)
  // option.outFile = `${output}` // for map
  try{
      let result = compiler.renderSync(option)
      fse.outputFileSync(output,result.css,)
      log.tag('写入css',`${utils.getOutputFile(output)}`)
  }
  catch(err){
    log.error(err)
  }
}
