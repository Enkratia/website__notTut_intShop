// import gulp from 'gulp';
// const { src, dest, series, watch } = gulp;
const { src, dest, series, watch } = require("gulp");
// import autoprefixer from 'gulp-autoprefixer';
const autoprefixer = require("gulp-autoprefixer");
// import cleanCSS from 'gulp-clean-css';
const cleanCSS = require("gulp-clean-css");
// import del from 'del';
const del = require("del");
// import sync from 'browser-sync';
// const browserSync = sync.create();
const browserSync = require("browser-sync").create();
// import sass from 'sass';
// import gulpSass from 'gulp-sass';
// const mainSass = gulpSass(sass);
const mainSass = require("gulp-sass")(require("sass"));
// import svgSprite from 'gulp-svg-sprite';
const svgSprite = require("gulp-svg-sprite");
// import svgmin from 'gulp-svgmin';
const svgmin = require("gulp-svgmin");
// import cheerio from 'gulp-cheerio';
const cheerio = require("gulp-cheerio");
// import replace from 'gulp-replace';
const replace = require("gulp-replace");
// import fileInclude from 'gulp-file-include';
const fileInclude = require("gulp-file-include");
// import rev from 'gulp-rev';
const rev = require("gulp-rev");
// import revRewrite from 'gulp-rev-rewrite';
const revRewrite = require("gulp-rev-rewrite");
// import revDel from 'gulp-rev-delete-original';
const revDel = require("gulp-rev-delete-original");
// import htmlmin from 'gulp-htmlmin';
const htmlmin = require("gulp-htmlmin");
// import gulpif from 'gulp-if';
const gulpif = require("gulp-if");
// import notify from 'gulp-notify';
const notify = require("gulp-notify");
// import imagemin from 'gulp-imagemin';
const image = require('gulp-imagemin');
// import { readFileSync } from 'fs';
const { readFileSync } = require("fs");
// import typograf from 'gulp-typograf';
const typograf = require('gulp-typograf');
// import webp from 'gulp-webp';
const webp = require('gulp-webp');
// import webpackStream from 'webpack-stream';
const webpackStream = require('webpack-stream');
// import plumber from 'gulp-plumber';
const plumber = require('gulp-plumber');
// import path from 'path';
const path = require('path');
// import zip from 'gulp-zip';
const zip = require('gulp-zip');

const rootFolder = path.basename(path.resolve());

// Paths
const srcFolder = './src';
const buildFolder = './app';
const paths = {
  srcSvg: `${srcFolder}/img/svg/**.svg`,
  srcImgFolder: `${srcFolder}/img`,
  buildImgFolder: `${buildFolder}/img`,

  srcFontsFolder: `${srcFolder}/assets/fonts`,
  buildFontsFolder: `${buildFolder}/fonts`,

  srcScss: `${srcFolder}/scss`,
  buildCssFolder: `${buildFolder}/css`,

  srcFullJs: `${srcFolder}/js/**/*.js`,
  srcMainJs: `${srcFolder}/js/main.js`,
  buildJsFolder: `${buildFolder}/js`,

  srcPartialsFolder: `${srcFolder}/partials`,
  resourcesFolder: `${srcFolder}/assets`,
};

// Dev by default
let isProd = false;

// Clean
const clean = () => {
  return del([buildFolder])
}

// Fonts
const fonts = () => {
  return src([`${paths.srcFontsFolder}/**.woff2`])
    .pipe(dest(paths.buildFontsFolder));
};

// SVG sprite
const svgSprites = () => {
  return src(paths.srcSvg)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(dest(paths.buildImgFolder));
}

// SCSS
const styles = () => {
  return src(`${paths.srcScss}/main.scss`, { sourcemaps: !isProd })
    .pipe(plumber(
      notify.onError({
        title: "SCSS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(mainSass())
    .pipe(autoprefixer({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(gulpif(isProd, cleanCSS({
      level: 2
    })))
    .pipe(dest(paths.buildCssFolder, { sourcemaps: '.' }))
    .pipe(browserSync.stream());
};



// JS
const scripts = () => {
  return src(paths.srcMainJs)
    .pipe(plumber(
      notify.onError({
        title: "JS",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(webpackStream({
      mode: isProd ? 'production' : 'development',
      output: {
        filename: 'main.js',
      },
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {
                  targets: "defaults"
                }]
              ]
            }
          }
        }]
      },
      devtool: !isProd ? 'source-map' : false
    }))
    .on('error', function (err) {
      console.error('WEBPACK ERROR', err);
      this.emit('end');
    })
    .pipe(dest(paths.buildJsFolder))
    .pipe(browserSync.stream());
}


// Resources
const resources = () => {
  return src(`${paths.resourcesFolder}/**`)
    .pipe(dest(buildFolder))
}

// Images
const images = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`])
    .pipe(gulpif(isProd, image([
      image.mozjpeg({
        quality: 80,
        progressive: true
      })
    ])))
    .pipe(dest(paths.buildImgFolder))
};


// WebpImages
const webpImages = () => {
  return src([`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`])
    .pipe(webp())
    .pipe(dest(paths.buildImgFolder))
};

// Html Includes
const htmlInclude = () => {
  return src([`${srcFolder}/*.html`])
    .pipe(fileInclude({
      prefix: '@',
      basepath: '@file'
    }))
    .pipe(typograf({
      locale: ['ru', 'en-US']
    }))
    .pipe(dest(buildFolder))
    .pipe(browserSync.stream());
}

// Watch
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: `${buildFolder}`
    },
  });

  watch(`${paths.srcScss}/**/*.scss`, styles);
  watch(paths.srcFullJs, scripts);

  watch(`${paths.srcPartialsFolder}/**/**.html`, htmlInclude);
  watch(`${paths.srcPartialsFolder}/*.html`, htmlInclude);
  watch(`${srcFolder}/*.html`, htmlInclude);

  watch(`${paths.resourcesFolder}/**`, resources);
  watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png,svg}`, images);
  watch(`${paths.srcImgFolder}/**/**.{jpg,jpeg,png}`, webpImages);
  watch(`${paths.srcFontsFolder}/**.{woff2}`, fonts);
  watch(paths.srcSvg, svgSprites);
}


// Cache
const cache = () => {
  return src(`${buildFolder}/**/*.{css,js,svg,png,jpg,jpeg,webp,woff2}`, {
    base: buildFolder
  })
    .pipe(rev())
    .pipe(revDel())
    .pipe(dest(buildFolder))
    .pipe(rev.manifest('rev.json'))
    .pipe(dest(buildFolder));
};

const rewrite = () => {
  const manifest = readFileSync('app/rev.json');
  src(`${paths.buildCssFolder}/*.css`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest(paths.buildCssFolder));
  return src(`${buildFolder}/**/*.html`)
    .pipe(revRewrite({
      manifest
    }))
    .pipe(dest(buildFolder));
}

const htmlMinify = () => {
  return src(`${buildFolder}/**/*.html`)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(dest(buildFolder));
}

const zipFiles = (done) => {
  del.sync([`${buildFolder}/*.zip`]);
  return src(`${buildFolder}/**/*.*`, {})
    .pipe(plumber(
      notify.onError({
        title: "ZIP",
        message: "Error: <%= error.message %>"
      })
    ))
    .pipe(zip(`${rootFolder}.zip`))
    .pipe(dest(buildFolder));
}

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(clean, htmlInclude, scripts, styles, resources, fonts, images, webpImages, svgSprites, watchFiles);
exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, fonts, images, webpImages, svgSprites, htmlMinify);
exports.cache = series(cache, rewrite);
exports.zip = zipFiles;



//======================//
// export default series(clean, htmlInclude, scripts, styles, resources, fonts, images, webpImages, svgSprites, watchFiles);
// OLD SERIES (?)
// exports.default = series(clean, htmlInclude, scripts, styles, resources, fonts, images, webpImages, svgSprites, watchFiles);
// exports.backend = series(clean, htmlInclude, scriptsBackend, stylesBackend, resources, images, webpImages, svgSprites)
// exports.build = series(toProd, clean, htmlInclude, scripts, styles, resources, images, webpImages, svgSprites, htmlMinify);

// SCRIPTS BACKEND (?)
// const scriptsBackend = () => {
//   return src(paths.srcMainJs)
//     .pipe(plumber(
//       notify.onError({
//         title: "JS",
//         message: "Error: <%= error.message %>"
//       })
//     ))
//     .pipe(webpackStream({
//       mode: 'development',
//       output: {
//         filename: 'main.js',
//       },
//       module: {
//         rules: [{
//           test: /\.m?js$/,
//           exclude: /node_modules/,
//           use: {
//             loader: 'babel-loader',
//             options: {
//               presets: [
//                 ['@babel/preset-env', {
//                   targets: "defaults"
//                 }]
//               ]
//             }
//           }
//         }]
//       },
//       devtool: false
//     }))
//     .on('error', function (err) {
//       console.error('WEBPACK ERROR', err);
//       this.emit('end');
//     })
//     .pipe(dest(paths.buildJsFolder))
//     .pipe(browserSync.stream());
// }

// STYLES BACKEND (?)
// const stylesBackend = () => {
//   return src(paths.srcScss)
//     .pipe(plumber(
//       notify.onError({
//         title: "SCSS",
//         message: "Error: <%= error.message %>"
//       })
//     ))
//     .pipe(mainSass())
//     .pipe(autoprefixer({
//       cascade: false,
//       grid: true,
//       overrideBrowserslist: ["last 5 versions"]
//     }))
//     .pipe(dest(paths.buildCssFolder))
//     .pipe(browserSync.stream());
// };