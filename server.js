var express = require('express'),
    app = express(),
    path = require('path'),
    i18n = require('i18next'),
    i18nFsBackend = require('i18next-node-fs-backend'),
    sprintf = require('i18next-sprintf-postprocessor')
    i18nMiddleware = require('i18next-express-middleware'),
    router = require('express').Router(),
    port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));
app.use(express.static('files'));
// i18next 初始設定
 i18n.use(i18nMiddleware.LanguageDetector) // 自動偵測用戶端語系
    .use(i18nFsBackend)
    .use(sprintf)
    .init({
            fallbackLng: "en",
            compatibilityAPI: 'v1',
            compatibilityJSON: 'v1',
            initImmediate: true,
            load: "all",
            interpolation:
   { escapeValue: true,
     prefix: '{{',
     suffix: '}}',
     unescapePrefix: '-',
     nestingPrefix: '$t(',
     nestingSuffix: ')',
     escapeInterpolation: false,
     esscape: false,
     defaultVariables: undefined },
            detection: {
  // order and from where user language should be detected
  order: [/*'path', 'session', */ 'querystring', 'cookie', 'header'],

  // keys or params to lookup language from
  lookupPath: 'lng',
  lookupFromPathIndex: 0,

  // cache user language
  caches: false, // ['cookie']

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: 'popcorntime.sh'
},
            resSetPath: 'locales/{{lng}}/__ns__.json',
            saveMissing: true,
            debug: true,
            detection : {
  // order and from where user language should be detected
  order: ['path', 'session', 'querystring', 'cookie', 'header'],

  // keys or params to lookup language from
  lookupPath: 'lng',
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupSession: 'lng',

  lookupFromPathIndex: 0,

  // cache user language
  caches: false, // ['cookie']

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: 'myDomain'
},
            sendMissingTo: 'fallback', // 備用語系，擷取失敗時會使用到這裡
            backend: {
                loadPath:  path.join(__dirname, 'locales/{{lng}}/translation.json'),
            }
        });


        app.use(i18nMiddleware.handle(i18n, {
          ignoreRoutes: ["/images", "/css", "/js", "/fonts"],
          removeLngFromUrl: false
        }));

var routes = require('./routes/index');
app.use('/', routes);


//app.use(express.static('public'));
//app.use(express.static('files'));



app.listen(port, function() {
    console.log("HTTP 伺服器在 http://127.0.0.1:3000/ 上運行 ");
});
