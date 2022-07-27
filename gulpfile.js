const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync");
const webHtmlNoSvg = require("gulp-webp-html-nosvg");
const versionNumber = require("gulp-version-number");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webp = require("gulp-webp");
const cleanCss = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");
const newer = require("gulp-newer");

function style () {
    return gulp.src("./css/**/*.scss")
        .pipe((sass()))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream())
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    })
    gulp.watch("./css/**/*.scss", style);
    gulp.watch("./*.html").on('change', browserSync.reload);
    gulp.watch("./js/*.js").on('change', browserSync.reload);
}

gulp.task("build", gulp.parallel(js, html, scss, images))

function js () {
    return gulp.src("./src/js/*.*")
        .pipe(gulp.dest("./dist/js"))
}

function html () {
    return gulp.src("./src/index.html")
        .pipe(webHtmlNoSvg())
        .pipe(versionNumber({
            "value": "%DT%",
            "append": {
                "key": "_v",
                "cover": 0,
                "to": [
                    "css",
                    "js"
                ]
            },
            "output": {
                "file": "./version.json"
            }
        }))
        .pipe(gulp.dest("./dist/"))
}

function scss () {
    return gulp.src("./src/css/style.css")
        .pipe(groupCssMediaQueries())        
        .pipe(autoPrefixer({
            overrideBrowserslist: ["last 3 version"],
            cascade: true
        }))
        .pipe(cleanCss())        
        .pipe(gulp.dest("./dist/css"))
}

function images () {
    return gulp.src("./src/img/**/*.{jpg,jpeg,png,gif,webp}")
        .pipe(newer("./dist/img/**/*.{jpg,jpeg,png,gif,webp}"))
        .pipe(gulp.dest("./dist/img"))
        .pipe(webp())
        .pipe(gulp.dest("./dist/img"))        
}

function production () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
}

exports.style = style;
exports.watch = watch;
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.production = production;