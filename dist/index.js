'use strict';

var fs = require('fs');
var path = require('path');
var scssBundle = require('scss-bundle');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

let compiler = null;
Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('vue-template-compiler')); })
  .then((module) => { compiler = module; })
  .catch(() => {});

function bundleScss({ output, exclusive = true, bundlerOptions = {} } = {}) {
  const files = [];
  const {
    project = null,
    dedupeGlobs = [],
    includePaths = [],
    ignoreImports = [],
  } = bundlerOptions;
  return {
    name: 'bundle-scss',
    transform(source, id) {
      if (/\.scss$/.test(id)) {
        files.push({ id, content: source });
        if (exclusive) {
          return { code: `export default ${JSON.stringify(source)}` };
        }
      }
      if (/\.vue$/.test(id) && compiler) {
        const { styles } = compiler.parseComponent(source);
        files.push(
          ...styles
            .filter((style) => style.lang === 'scss')
            .map((style, index) => ({
              id: `${id}.${index}.scss`,
              content: style.content,
            })),
        );
      }
      return null;
    },
    async generateBundle(opts) {
      const outputPath = path__default['default'].resolve(
        opts.file ? path__default['default'].dirname(opts.file) : opts.dir,
        output || `${opts.file ? path__default['default'].parse(opts.file).name : 'index'}.scss`,
      );
      await fs.promises.mkdir(path__default['default'].dirname(outputPath), { recursive: true });
      const entryContent = files.map((file) => `@import "${file.id}";`).join('\n');
      await fs.promises.writeFile(outputPath, entryContent);
      const registry = Object.assign({}, ...files.map((file) => ({ [file.id]: file.content })));
      const bundler = new scssBundle.Bundler(registry, project);
      const result = await bundler.bundle(outputPath, dedupeGlobs, includePaths, ignoreImports);
      await fs.promises.writeFile(outputPath, result.bundledContent);
    },
  };
}

module.exports = bundleScss;
