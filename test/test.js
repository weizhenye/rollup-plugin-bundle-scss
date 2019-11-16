const fs = require('fs').promises;
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

async function run(name, output = './dist/index.scss') {
  await exec(`rollup -c=${resolve('cases', name, 'rollup.config.js')}`);
  const scss = await fs.readFile(resolve('cases', name, output), 'utf-8');
  expect(scss).toMatchSnapshot();
}

describe('cases', () => {
  test('basic', () => run('basic'));
  test('custom-output', () => run('custom-output', './dist/custom.scss'));
  test('vue', () => run('vue'));
});
