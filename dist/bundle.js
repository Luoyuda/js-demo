(function(graph){
    function require(file){
      function absRequire(relPath){
        return require(graph[file].deps[relPath])
      }
      var exports = {}
      (function(require, code) {
        eval(code)
      })(absRequire, graph[file].code)
      return exports
    }
    require(C:\code\js-demo\MyWebpack/src/index.js)
  })({"C:\\code\\js-demo\\MyWebpack/src/index.js":{"deps":{"./add.js":"C:\\code\\js-demo\\MyWebpack\\src\\add.js","./minus.js":"C:\\code\\js-demo\\MyWebpack\\src\\minus.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _minus = _interopRequireDefault(require(\"./minus.js\"));\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\n\nvar sum = (0, _add[\"default\"])(1, 2);\nvar division = (0, _minus[\"default\"])(2, 1);\nconsole.log(\"sum = \".concat(sum));\nconsole.log(\"division = \".concat(division));"},"C:\\code\\js-demo\\MyWebpack\\src\\add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a + b;\n};\n\nexports[\"default\"] = _default;"},"C:\\code\\js-demo\\MyWebpack\\src\\minus.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\n\nvar _default = function _default(a, b) {\n  return a - b;\n};\n\nexports[\"default\"] = _default;"}})