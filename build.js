// build.js
require('esbuild').build({
    entryPoints: ['client/widget.js'],
    bundle: true,
    minify: true,
    sourcemap: false,
    target: ['es2018'],
    outfile: 'client/widget.bundle.js'
  }).catch(() => process.exit(1));