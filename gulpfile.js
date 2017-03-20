// including plugins
var minifyCSS = require('gulp-minify-css')
var autoprefixer = require('gulp-autoprefixer')

var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    to5 = require('gulp-6to5')


gulp.task('es6-es5', function(){
	return gulp.src([
                './src/serverapp.js',
                './src/*/**.js',
                './src/*/*/**.js'
			]
		)
		.pipe(to5())
		.pipe(gulp.dest('./public/dist/es5/'))
});

gulp.task('css', function(){
    return gulp.src(
            [            
                './public/css/base.css',
                './public/css/DateTimePicker.css',
                './public/css/owl.carousel.css',
                './public/css/owl.theme.default.css'
            ]
        )
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(gp_concat('style.min.css'))
        .pipe(gulp.dest('./public/dist/css/'))
})

gulp.task('copy-fonts', function(){
    return gulp.src(
            ['./public/css/fontello/**']
        )
        .pipe(gulp.dest('./public/dist/css/fontello/'))
})

gulp.task('copy-lightbox', function(){
    return gulp.src(
            ['./public/img/lightbox/**']
        )
        .pipe(gulp.dest('./public/dist/img/lightbox/'))
})

//gulp.task('copy', ['copy-fonts', 'copy-lightbox'], function(){})
gulp.task('copy', ['copy-fonts'], function(){})


gulp.task('build', function(){
    return gulp.src(
    		[
				'./public/js/jquery-1.11.2.min.js',
                './public/js/common_scripts_min.js',
                './public/js/functions.js',
                './public/js/DateTimePicker.js',
                './public/js/theia-sticky-sidebar.js',
                './public/js/sidebar-config.js',
                './public/js/sweetalert.min.js',
                './public/js/velocity360.js',
                './public/js/tutorials.js'
    		]
    	)
        .pipe(gp_concat('gulp-concat.js'))
        .pipe(gulp.dest('./public/min/'))
        .pipe(gp_rename('vendor.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/dist/'))
});

gulp.task('watch', function() {
    gulp.watch(['./src/serverapp.js', './src/*/**.js', './src/*/*/**.js', './public/js/**.js'], ['es6-es5', 'build'])
})

gulp.task('prod', ['es6-es5', 'build', 'css', 'copy'], function(){})

gulp.task('default', ['es6-es5', 'build', 'css', 'copy', 'watch'], function(){})

