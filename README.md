# angular-todo

Manage your todo list with Angular 4, Bootstrap 4 and Firebase 4.



## Configure app

```bash
npm install
```

First things first, install `npm` packages...



## Configure Firebase

```bash
firebase login
firebase init
```

Login into your Firebase account and initialize a Firebase project in this directory.

In this process, do NOT overwrite existing `database.rules.json` and set `dist/` as your public directory.

```javascript
export const environment = {
  firebase: {
    apiKey: '<API_KEY>',
    authDomain: '<PROJECT_ID>.firebaseapp.com',
    databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
  }
};
```

Open `environment.ts` and  `environment.prod.ts` files and initialize Firebase with your project's customized code snippet.



## Build

```bash
npm run build:prod -- --bh / --langs en,fr --dl fr
```

Build the app in the `dist/` folder.

| Options | Meaning |
| ------- | ------- |
| `--bh` | Configure the --baseHref for `angular-cli` |
| `--lang` | List of supported languages separated by coma |
| `--dl` | Set the default language |
| `--htaccess` | Add `.htaccess` for URL rewriting (if deployed on Apache web server) |



## Deploy

```bash
firebase deploy
```

Deploy Firebase realtime database and hosting.



## Run locally

| Script | Purpose |
| ------ | ------- |
| `npm start` | Serve app without i18n |
| `npm run start:fr` | Build app using i18n french translation |
| `npm run start:dist` | After building the app using `npm run build:prod` open an `http-server` to serve the `dist/` folder. Notice that `.htaccess` will have no effect. |



## Internationalization

```bash
npm run i18n
```

Update the master translation file: `src/i18n/messages.xlf`.

Don't forget to update `messages.fr.xlf` accordingly...



## Demo

https://angular-todo-avine.firebaseapp.com/fr/todo/all

https://avine.io/projects/angular-todo/



## Screenshots

#### Sign in page:
<img src="./screenshot-1.png" width="440" />

#### Main page:
<img src="./screenshot-2.png" width="440" />
