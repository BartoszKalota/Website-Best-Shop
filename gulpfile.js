const gulp = require('gulp');
const jshint = require('gulp-jshint');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('jshint', function() {
    return gulp.src('js/*.js')
        .pipe( jshint() )
        .pipe( jshint.reporter('default') )
});

gulp.task('sass', function() {
    return gulp.src('development/scss/main.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass({
            outputStyle: 'expanded',
            sourceComments: 'map'
        }).on('error', sass.logError) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest('development/css') )
});

gulp.task('watch', function() {
    gulp.watch('development/scss/**/*.scss', gulp.series('sass'));
});