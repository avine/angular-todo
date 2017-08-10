#!/usr/bin/env node

const argv = require('yargs').argv;

const fs = require('fs');

const execSync = require('child_process').execSync;
const exec = command => execSync(command, { stdio: 'inherit' });

const bh = argv['bh'] || '/';
console.log(`\nBaseHref = ${bh}`);

const langs = argv['langs'] ? argv['langs'].split(',') : [];

if (!langs.length) {
  exec(`ng build --output-path=dist/ --aot -prod --bh ${bh}`);
} else {
  console.log(`\nBuilding '${langs[0]}'...`);
  exec(`
    lang=${langs[0]}
    ng build --output-path=dist/$lang --aot -prod --bh ${bh}$lang/ --locale=$lang
  `);

  for (let i = 1; i < langs.length; i++) {
    console.log(`\nBuilding '${langs[i]}'...`);
    exec(`
      lang=${langs[i]}
      ng build --output-path=dist/$lang --aot -prod --bh ${bh}$lang/ --i18n-file=src/i18n/messages.$lang.xlf --i18n-format=xlf --locale=$lang
    `);
  }

  let htaccess = fs.readFileSync('src/apache/.htaccess', 'utf8');
  htaccess =
    htaccess
      .replace(/{{BASE_HREF}}/g, bh)
      .replace(/{{LANGS}}/g, `(${langs.join('|')})`)
      .replace(/{{DEFAULT_LANG}}/g, langs[0]);

  let index = fs.readFileSync('src/apache/index.html', 'utf8');
  index = index.replace(/{{DEFAULT_LANG}}/g, langs[0]);

  console.log('\nGenerate .htaccess and index.html');
  fs.writeFileSync('dist/.htaccess', htaccess, 'utf8');
  fs.writeFileSync('dist/index.html', index, 'utf8');
}
