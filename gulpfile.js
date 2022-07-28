const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const browserSync = require("browser-sync");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const htmlmin = require("gulp-htmlmin");
const cleanCss = require("gulp-clean-css");
const autoPrefixer = require("gulp-autoprefixer");
const newer = require("gulp-newer");

function style () {
    return gulp.src("./src/css/**/*.scss")
        .pipe((sass()))
        .pipe(gulp.dest("./src/css"))
        .pipe(browserSync.stream())
}

function watch () {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    })
    gulp.watch("./src/css/**/*.scss", style);
    gulp.watch("./src/*.html").on('change', browserSync.reload);
    gulp.watch("./src/js/*.js").on('change', browserSync.reload);
}

gulp.task("build", gulp.parallel(js, html, gulp.series(style, scss), images))

function js () {
    return gulp.src("./src/js/*.*")
        .pipe(gulp.dest("./dist/js"))
}

function html () {
    return gulp.src("./src/index.html")
        .pipe(htmlmin({ collapseWhitespace: true }))      
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