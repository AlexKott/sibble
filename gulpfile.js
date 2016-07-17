const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const mochaPhantom = require('gulp-mocha-phantomjs');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const addSrc = require('gulp-add-src');
const concat = require('gulp-concat');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

function catchError(e) {
    console.log(e);
    this.emit('end')
}

gulp.task('default', ['js', 'hbs', 'css']);

gulp.task('w', () => {
    livereload.listen();
    nodemon({
        script: 'index.js'
    });
    gulp.watch('src/less/**/*.less', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/hbs/**/**/*', ['hbs']);
    gulp.watch(jsSrc, ['lint']);
});

gulp.task('js', () => {
    return browserify('src/js/app.js', { debug: true })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .on('error', catchError)
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('public'))
        .pipe(gulp.dest('public'))
        .pipe(livereload());
});

gulp.task('hbs', () => {
    return gulp.src('src/hbs/**/*.hbs')
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'App.templates',
            noRedeclare: true,
        }))
        .pipe(addSrc('node_modules/handlebars/dist/handlebars.min.js'))
        .pipe(concat('templates.js'))
        .pipe(gulp.dest('public'))
        .pipe(livereload());
});

gulp.task('css', () => {
    return gulp.src('src/less/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .on('error', catchError)
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('lint', () => {
    return gulp.src(jsSrc)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        .pipe(livereload());
});

gulp.task('test', ['test-phantom'], () => {
    return gulp.src('test/**/**/**/*.js')
        .pipe(mocha({ reporter: 'dot' }))
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });;
});

gulp.task('test-phantom', ['compileTests'], () => {
    return gulp.src('test_phantomjs/test.html')
        .pipe(mochaPhantom({ reporter: 'dot' }));
});

gulp.task('compileTests', () => {
    return browserify('test_phantomjs/entry.js', { debug: true })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .on('error', catchError)
        .pipe(source('test.js'))
        .pipe(gulp.dest('test_phantomjs'));
});

const jsSrc = [
    './*.js',
    'models/*.js',
    'routes/**/*.js',
    'services/**/*.js',
    'test/**/**/**/*.js',
    '!test/phantomjs/test.js',
    'utils/*.js',
    'src/js/**/*.js',
    '!node_modules',
    '!gulpfile.js',
    '!public/*.js'
];
