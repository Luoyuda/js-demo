const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')
const getModuleInfo = file => {
  const body = fs.readFileSync(path.join(__dirname, file), 'utf-8');
  // 分析生成 AST
  const ast = parser.parse(body, { 
    sourceType: 'module'
  })
  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }){
      const value = node.source.value
      // 收集依赖
      deps[value] = path.join(path.dirname(file), value)
    }
  })
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })
  const moduleInfo = { file, deps, code }
  return moduleInfo
}
const parseModules = file => {
  const entry = getModuleInfo(file)
  const temp = [entry]
  const depsGraph = {}
  for(let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps
    if(deps){
      for(const key in deps) {
        if(deps.hasOwnProperty(key)){
          temp.push(getModuleInfo(deps[key]))
        }
      }
    }
  }
  temp.forEach(({ deps, file, code }) => {
    depsGraph[file] = {
      deps,
      code
    }
  })
  return depsGraph
}

const bundle = file => {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function(graph){
    function require(file){
      function absRequire(relPath){
        return require(graph[file].deps[relPath])
      }
      var exports = {};
      (function(require, code) {
        eval(code)
      })(absRequire, graph[file].code)
      return exports
    }
    require('${file}')
  })(${depsGraph})`
}

const content = bundle(`/src/index.js`)
console.log(content)
const distDir = path.join(__dirname, '/dist')
fs.mkdirSync(distDir)
fs.writeFileSync(`${distDir}/bundle.js`, content)