'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var fs = require('fs');
var path = _interopDefault(require('path'));
var compiler = _interopDefault(require('vue-template-compiler'));
var scssBundle = require('scss-bundle');

function bundleScss({ output }) {
  const files = [];
  return {
    name: 'bundle-scss',
    transform(source, id) {
      if (/\.scss$/.test(id)) {
        files.push({ id, content: source });
        return { code: `export default ${JSON.stringify(source)}` };
      }
      if (/\.vue$/.test(id)) {
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
      const outputPath = path.resolve(
        path.dirname(opts.file),
        output || `${path.parse(opts.file).name}.scss`,
      );
      await fs.promises.mkdir(path.dirname(outputPath), { recursive: true });
      const entryContent = files.map((file) => `@import "${file.id}";`).join('\n');
      await fs.promises.writeFile(outputPath, entryContent);
      const registry = Object.assign({}, ...files.map((file) => ({ [file.id]: file.content })));
      const bundler = new scssBundle.Bundler(registry);
      const result = await bundler.bundle(outputPath);
      await fs.promises.writeFile(outputPath, result.bundledContent);
    },
  };
}

module.exports = bundleScss;
