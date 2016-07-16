const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const livereload = require('gulp-livereload');
const eslint = require('gulp-eslint');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

function catchError(e) {
    console.log(e);
    this.emit('end')
}

gulp.task('default', ['css', 'lint', 'js']);

gulp.task('w', () => {
    livereload.listen();
    nodemon({
        script: 'index.js'
    }).on('restart', () => {
        gulp.src('index.js')
            .pipe(livereload());
    });
    gulp.watch('src/less/**/*.less', ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('test/phamtomjs/**/*.js', ['compileTests']);
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
        .pipe(gulp.dest('public'));
});

gulp.task('compileTests', () => {
    return browserify('test_phantomjs/entry.js', { debug: true })
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .on('error', catchError)
        .pipe(source('test.js'))
        .pipe(gulp.dest('test_phantomjs'));
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
        .pipe(eslint.failAfterError());
});

const jsSrc = [
    './*.js',
    'models/*.js',
    'routes/**/*.js',
    'services/**/*.js',
    'test/**/**/**/*.js',
    '!test/phantomjs/test.js',
    'utils/*.js',
    'src/js/*.js',
    'src/hbs/helpers/**/*.js',
    '!node_modules/**',
    '!gulpfile.js',
    '!public/*.js'
];
