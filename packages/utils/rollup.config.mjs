import ts from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync('./package.json'), 'utf-8');

const config = {
  name: 'utils',
  globalName: 'Utils',
  globals: {},
  external: []
};

/** build config */

const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg?.author?.name || ''}
 * @license MIT
 */`;

// ensure TS checks only once for each build
let checkTS = true;

const outputConfigs = {
  // each file name has the format: `dist/${name}.${format}.${ext}`
  // format being a key of this object
  mjs: {
    file: pkg.module,
    format: `es`
  },
  cjs: {
    file: pkg.module.replace('mjs', 'cjs'),
    format: `cjs`
  },
  global: {
    file: pkg.unpkg,
    format: `iife`
  },
  browser: {
    file: pkg.module.replace('mjs', 'esm-browser.js'),
    format: `es`
  }
};

const packageBuilds = Object.keys(outputConfigs);
const packageConfigs = packageBuilds.map((buildName) =>
  createConfig(buildName, outputConfigs[buildName])
);

// only add the production ready if we are bundling the options
packageBuilds.forEach((buildName) => {
  if (buildName === 'cjs') {
    packageConfigs.push(createProductionConfig(buildName));
  } else if (buildName === 'global') {
    packageConfigs.push(createMinifiedConfig(buildName));
  }
});

export default packageConfigs;

function createConfig(buildName, output, plugins = []) {
  if (!output) {
    console.log(`invalid format: "${buildName}"`);
    process.exit(1);
  }

  output.sourcemap = false;
  output.banner = banner;

  // https://cn.rollupjs.org/configuration-options/#output-externallivebindings
  output.externalLiveBindings = false;
  output.globals = config.globals;

  if (buildName === 'global') output.name = config.globalName;

  const tsPlugin = ts({
    check: checkTS,
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: false,
        declaration: checkTS,
        declarationMap: checkTS
      }
    }
  });

  checkTS = false;

  const external = config.external;

  const nodePlugins = [nodeResolve(), commonjs()];

  return {
    input: `src/index.ts`,

    external,
    plugins: [tsPlugin, ...nodePlugins, ...plugins],
    output
  };
}

function createProductionConfig(format) {
  const extension = format === 'cjs' ? 'cjs' : 'js';
  const descriptor = format === 'cjs' ? '' : `.${format}`;
  return createConfig(format, {
    file: `dist/${config.name}${descriptor}.prod.${extension}`,
    format: outputConfigs[format].format
  });
}

function createMinifiedConfig(format) {
  return createConfig(
    format,
    {
      file: `dist/${config.name}.${format === 'global' ? 'iife' : format}.prod.js`,
      format: outputConfigs[format].format
    },
    [
      terser({
        module: /^esm/.test(format),
        compress: {
          ecma: 2015,
          pure_getters: true
        }
      })
    ]
  );
}
