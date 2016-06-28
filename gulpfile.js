const gulp = require('gulp');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix({ browsers: ['last 2 versions'] });

gulp.task('default', ['css', 'lint', 'js']);

gulp.task('w', () => {
    gulp.watch('./src/less/**/*.less', ['css']);
    gulp.watch('./src/js/**/*.js', ['js', 'lint']);
});

gulp.task('js', () => {
    return gulp.src('./src/js/app.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public'));
});

gulp.task('css', () => {
    return gulp.src('./src/less/main.less')
        .pipe(less({
            plugins: [autoprefix]
        }))
        .pipe(gulp.dest('./public'));
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
    'routes/*.js',
    'test/**/**/**/*.js',
    'utils/*.js',
    'src/js/*.js',
    '!node_modules/**',
    '!gulpfile.js',
    '!public/*.js'
];
