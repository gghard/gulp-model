var gulp = require('gulp'),
	cssmin = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rev = require('gulp-rev-append'),
    clean = require('gulp-clean'),
    webserver = require('gulp-webserver');


gulp.task('gulpcssmin', function () {
    gulp.src('./src/css/*.css')
    	.pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, 
            remove:true
        }))
        .pipe(concat('all.css'))
        .pipe(cssmin({keepSpecialComments: '*'}))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('gulpjsmin', function () {
    gulp.src('./src/js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('gulpimagemin', function () {
    gulp.src('./src/images/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('gulphtmlmin', function () {
    var options = {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('./src/*.html')
	    .pipe(rev())
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
    gulp.watch('./src/css/*.css', ['gulpcssmin']);
    gulp.watch('./src/images/*.{png,jpg,gif,ico}', ['gulpimagemin']);
    gulp.watch('./src/js/*.js', ['gulpjsmin']);
    gulp.watch('./src/*.html', ['gulphtmlmin']); 
});

gulp.task('clean', function() {
  return gulp.src('./dist/*', {read: false})
    .pipe(clean({force: true}));
});

gulp.task('webserver', function() {
	gulp.src('./')
		.pipe(webserver({
			port:81,
			livereload: true,
			directoryListing: true,
			open: true
		}));
});

gulp.task('default', ['clean'], function(){
    gulp.start( 'webserver','gulpcssmin','gulpimagemin','gulphtmlmin','gulpjsmin','watch');
});

gulp.task('dist',['gulpcssmin','gulpimagemin','gulphtmlmin','gulpjsmin'])




