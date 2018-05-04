let fs = require('fs-extra')
let chokidar = require('chokidar')
let Path = require('path')
let utils = require('../utils/utils')
let projectConfig = utils.getProjectConfig()
let log = utils.log
let jsCompiler = require('./compiler/compile-js')
let cssCompiler = require('./compiler/compile-css')

log.tag('监听文件变动中')
// analyse scss & js dependence before watch
let sassGraph = require('sass-graph')
let cssTree = sassGraph.parseDir(utils.getSrcPath()).index

function cssAnylase(path){
  let absolutePath = Path.resolve(path)
  if(cssTree[absolutePath]){
    let r = cssTree[absolutePath].importedBy
    r.push(absolutePath)
    return r
  }
  return [absolutePath]
}

function jsAnylase(path){
  // let absolutePath = Path.resolve(path)
  return [path]
}

// todo js dependence analyse
let watcher = chokidar.watch(utils.getSrcPath())
watcher.on('change', path => {
  let ext = Path.extname(path)
  if (ext === projectConfig.css.ext) {
    cssCompiler(v)
    // cssAnylase(path).forEach((v)=>{
    //   cssCompiler(v)
    // })
  }
  else if (ext === projectConfig.js.ext) {
    // clear jsTree on finish compiler
    jsCompiler.compiler(path)
    jsCompiler.clearTrace()
  }
  else {
    // copy
    let destPath = utils.getOutputFile(path)
    fs.copySync(path,destPath)
    log.tag('复制文件',`${destPath}`)
  }
})