#!/usr/bin/env node

const yargs = require('yargs');
const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');

const argv = yargs.argv;
const exec = command => cp.execSync(command, {stdio: 'inherit'});

// (option: --bh) Base href
const bh = argv['bh'] || '/';

// (option: --langs) List of languages separated by `,``
// Notice: the first language should be the one used in the app source code
// (which don't have a defined "messages.<lang>.xlf" file)
const langs = argv['langs'] ? argv['langs'].split(',') : [];

// (option: --dl) Default language to use in apache config when redirecting bad url
const defaultLang = langs.length ? (argv['dl'] || langs[0]) : null;

// (option: --htaccess) Add .htaccess in the dist/ folder ?
let useHtaccess = argv['htaccess'] === true || argv['htaccess'] === 'true';

// Execute build command according to "<lang>" and "messages.<lang>.xlf" availibility
const execBuildCmd = (lang, hasXlf) => {
  let cmd;
  if (!lang) {
    cmd = `ng build --output-path=dist/ --aot -prod --bh ${bh}`;
  } else {
    const xlfOptions = hasXlf ? '--i18n-file=src/i18n/messages.$lang.xlf --i18n-format=xlf' : '';
    cmd = `lang=${lang}; ng build --output-path=dist/$lang --aot -prod --bh ${bh}$lang/ --locale=$lang ${xlfOptions}`;
  }
  console.log(chalk.green(`\nBuilding "dist/${lang || ''}"...`));
  console.log(`${cmd}\n`);
  exec(cmd);
};

// Start building...

console.log(chalk.white.bgBlue('Building App for production'));
console.log(`\nUsing baseHref: "${bh}"`);

if (!langs.length) {
  // Build app
  execBuildCmd();
} else {
  // Build app for each language
  langs.forEach((lang, index) => execBuildCmd(lang, index !== 0));

  // Build apache config
  console.log(chalk.green(`\nConfiguring root (using default language: "${defaultLang}"):`));

  let index = fs.readFileSync('src/apache/index.html', 'utf8');
  index =
    index
      .replace(/<BASE_HREF>/g, bh)
      .replace(/<DEFAULT_LANG>/g, defaultLang);

  fs.writeFileSync('dist/index.html', index, 'utf8');
  console.log('dist/index.html');

  if (useHtaccess) {
    let htaccess = fs.readFileSync('src/apache/.htaccess', 'utf8');
    htaccess =
      htaccess
        .replace(/<BASE_HREF>/g, bh)
        .replace(/<DEFAULT_LANG>/g, defaultLang)
        .replace(/<LANGS>/g, `(${langs.join('|')})`);

    fs.writeFileSync('dist/.htaccess', htaccess, 'utf8');
    console.log('dist/.htaccess');
  }
}

console.log();
