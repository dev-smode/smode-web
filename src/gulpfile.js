'use strict';

var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var prettify = require('gulp-prettify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var rtlcss = require('gulp-rtlcss');
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var lint = require('gulp-eslint');

gulp.task('clean', function () {
  return gulp.src('.tmp/', {read: false})
    .pipe(clean());
});

gulp.task('concat', function () {
  return gulp.src(['./backoffice/js/**/*.js'])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('.tmp/'));
});

gulp.task('browserify', function () {
  return browserify('.tmp/app.js', {debug: true})
    .transform(babelify, {presets: ['es2015']})
    .bundle()
    .pipe(fs.createWriteStream('./bundle.js'));
});

gulp.task('default', ['build', 'watch']);

gulp.task('build', function (cb) {
  runSequence('clean', 'concat', 'browserify', cb);
});

gulp.task('build-production', function (cb) {
  runSequence('build', 'concat-css', 'build-js-bundle-0','build-js-bundle-1',cb);
});

gulp.task('node_modules_to_dist', function () {
  var node_modules = [
    './node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.css',
    './node_modules/ladda/dist/ladda-themeless.min.css',
    './node_modules/sweetalert2/dist/sweetalert2.min.css',
    './node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
    './node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
    './node_modules/angular-jwt/dist/angular-jwt.min.js',
    './node_modules/angular-base64-upload/dist/angular-base64-upload.min.js',
    './node_modules/moment/min/moment-with-locales.min.js',
    './node_modules/angular-modal-service/dst/angular-modal-service.min.js',
    './node_modules/angular-moment/angular-moment.min.js',
    './node_modules/ladda/dist/spin.min.js',
    './node_modules/ladda/dist/ladda.min.js',
    './node_modules/angular-ladda/dist/angular-ladda.min.js',
    './node_modules/sweetalert2/dist/sweetalert2.min.js',
    './node_modules/swangular/swangular.js',
    './node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
    './node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
    './node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    './node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
    './node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
    './node_modules/angular-translate/dist/angular-translate.js',
    './node_modules/angular-translate/dist/angular-translate.js',
  ];
  gulp.src(node_modules, {base: './'})
    .pipe(gulp.dest('./dist'));

});

gulp.task('concat-css',function (){
  var cssFiles = [
    './assets/global/plugins/font-awesome/css/font-awesome.min.css',
    './node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.css',
    './assets/global/plugins/simple-line-icons/simple-line-icons.min.css',
    './assets/global/plugins/bootstrap/css/bootstrap-rtl.min.css',
    './assets/global/plugins/bootstrap/css/bootstrap.min.css',
    './assets/global/plugins/bootstrap-switch/css/bootstrap-switch-rtl.min.css',
    './assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
    './assets/global/plugins/morris/morris.css',
    './assets/global/css/app.css',
    './assets/global/css/components-rtl.min.css',
    './assets/global/css/components.min.css',
    './assets/global/css/plugins-rtl.min.css',
    './assets/global/css/plugins.min.css',
    './assets/layouts/layout/css/layout-rtl.min.css',
    './assets/layouts/layout/css/layout.min.css',
    './assets/layouts/layout/css/themes/light2-rtl.min.css',
    './assets/layouts/layout/css/themes/light2.min.css',
    './assets/layouts/layout/css/custom-rtl.min.css',
    './assets/layouts/layout/css/custom.min.css',
    './assets/pages/css/login-3.min.css',
    './assets/global/plugins/select2/css/select2-bootstrap.min.css',
    './assets/global/plugins/select2/css/select2.min.css',
    './node_modules/ladda/dist/ladda-themeless.min.css',
    './node_modules/sweetalert2/dist/sweetalert2.min.css',
    './node_modules/angular-bootstrap-datetimepicker/src/css/datetimepicker.css'
  ];
  gulp.src(cssFiles).pipe(concat('bundle.css')).pipe(gulp.dest('./dist'));
});

gulp.task('build-js-bundle-0',function (){
  var files = [
    './assets/global/plugins/jquery.min.js',
    './assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js',
    './assets/global/plugins/jquery.blockui.min.js',
    './assets/global/plugins/jquery.sparkline.min.js',
    './assets/global/plugins/bootstrap/js/bootstrap.min.js',
    './assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js',
    './assets/global/plugins/js.cookie.min.js',
    './assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
    './assets/global/plugins/angularjs/angular.min.js',
    './assets/global/plugins/angularjs/angular-sanitize.min.js',
    './assets/global/plugins/angularjs/angular-touch.min.js',
    './assets/global/plugins/angularjs/plugins/angular-ui-router.min.js',
    './assets/global/plugins/angularjs/plugins/ui-bootstrap-tpls.min.js',
    './assets/global/scripts/datatable.min.js',
    './assets/global/plugins/datatables/datatables.min.js',
    './assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.js',
    './assets/global/plugins/morris/raphael-min.js',
    './assets/global/plugins/morris/morris.min.js',
  ];
  gulp.src(files).pipe(concat('bundle-0.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});
gulp.task('build-js-bundle-1',function (){
  var files = [
    './assets/global/scripts/app.min.js',
    './assets/layouts/layout/scripts/layout.min.js',
    './assets/layouts/global/scripts/quick-sidebar.min.js',
    './assets/layouts/global/scripts/quick-nav.min.js',
    './assets/layouts/layout/scripts/demo.min.js',
    './assets/pages/scripts/table-datatables-managed.min.js',
    './node_modules/angular-jwt/dist/angular-jwt.min.js',
    './node_modules/angular-base64-upload/dist/angular-base64-upload.min.js',
    './node_modules/moment/min/moment-with-locales.min.js',
    './node_modules/angular-modal-service/dst/angular-modal-service.min.js',
    './node_modules/angular-moment/angular-moment.min.js',
    './assets/pages/scripts/dashboard.min.js',
    './node_modules/ladda/dist/spin.min.js',
    './node_modules/ladda/dist/ladda.min.js',
    './node_modules/angular-ladda/dist/angular-ladda.min.js',
    './node_modules/sweetalert2/dist/sweetalert2.min.js',
    './node_modules/swangular/swangular.js',
    './node_modules/angular-progress-button-styles/dist/angular-progress-button-styles.min.js',
    './node_modules/angular-translate/dist/angular-translate.js',
    './node_modules/angular-translate/dist/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
    './node_modules/angular-recaptcha/release/angular-recaptcha.min.js',
    './assets/global/scripts/datepicker.js'
  ];
  gulp.src(files).pipe(concat('bundle-1.js')).pipe(uglify()).pipe(gulp.dest('./dist'));
});

gulp.task('watch', function () {
  gulp.watch(['./backoffice/**/*'], ['build']);
});

//*** SASS compiler task
gulp.task('sass', function () {
  // bootstrap compilation
  gulp.src('./sass/bootstrap.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/global/plugins/bootstrap/css/'));

  // select2 compilation using bootstrap variables
  gulp.src('./assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest('./dist/assets/global/plugins/select2/css/'));

  // global theme stylesheet compilation
  gulp.src('./sass/global/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/global/css'));
  gulp.src('./sass/apps/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/apps/css'));
  gulp.src('./sass/pages/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/pages/css'));

  // theme layouts compilation
  gulp.src('./sass/layouts/layout/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout/css'));
  gulp.src('./sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout/css/themes'));

  gulp.src('./sass/layouts/layout2/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout2/css'));
  gulp.src('./sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout2/css/themes'));

  gulp.src('./sass/layouts/layout3/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout3/css'));
  gulp.src('./sass/layouts/layout3/themes/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout3/css/themes'));

  gulp.src('./sass/layouts/layout4/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout4/css'));
  gulp.src('./sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout4/css/themes'));

  gulp.src('./sass/layouts/layout5/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout5/css'));

  gulp.src('./sass/layouts/layout6/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout6/css'));

  gulp.src('./sass/layouts/layout7/*.scss').pipe(sass()).pipe(gulp.dest('./dist/assets/layouts/layout7/css'));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

//*** CSS & JS minify task
gulp.task('minify', function () {
  // css minify
  gulp.src(['./assets/apps/css/*.css', '!./assets/apps/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/apps/css/'));

  gulp.src(['./assets/global/css/*.css', '!./assets/global/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/global/css/'));
  gulp.src(['./assets/pages/css/*.css', '!./assets/pages/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/pages/css/'));

  gulp.src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./dist/assets/layouts/'));
  gulp.src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*.min.css']).pipe(rename({suffix: '.min'})).pipe(minifyCss()).pipe(gulp.dest('./dist/assets/layouts/'));

  gulp.src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*.min.css']).pipe(minifyCss()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/global/plugins/bootstrap/css/'));

  //js minify
  gulp.src(['./assets/apps/scripts/*.js', '!./assets/apps/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/apps/scripts/'));
  gulp.src(['./assets/global/scripts/*.js', '!./assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/global/scripts'));
  gulp.src(['./assets/pages/scripts/*.js', '!./assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/pages/scripts'));
  gulp.src(['./assets/layouts/**/scripts/*.js', '!./assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist/assets/layouts/'));


});

gulp.task('copy:plugins', function () {
  gulp.src('./assets/global/**/*').pipe(gulp.dest('./dist/assets/global/plugins'));
});

//*** RTL convertor task
gulp.task('rtlcss', function () {

  gulp
    .src(['./assets/apps/css/*.css', '!./assets/apps/css/*-rtl.min.css', '!./assets/apps/css/*-rtl.css', '!./assets/apps/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/apps/css'));

  gulp
    .src(['./assets/pages/css/*.css', '!./assets/pages/css/*-rtl.min.css', '!./assets/pages/css/*-rtl.css', '!./assets/pages/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/pages/css'));

  gulp
    .src(['./assets/global/css/*.css', '!./assets/global/css/*-rtl.min.css', '!./assets/global/css/*-rtl.css', '!./assets/global/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/global/css'));

  gulp
    .src(['./assets/layouts/**/css/*.css', '!./assets/layouts/**/css/*-rtl.css', '!./assets/layouts/**/css/*-rtl.min.css', '!./assets/layouts/**/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/layouts'));

  gulp
    .src(['./assets/layouts/**/css/**/*.css', '!./assets/layouts/**/css/**/*-rtl.css', '!./assets/layouts/**/css/**/*-rtl.min.css', '!./assets/layouts/**/css/**/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/layouts'));

  gulp
    .src(['./assets/global/plugins/bootstrap/css/*.css', '!./assets/global/plugins/bootstrap/css/*-rtl.css', '!./assets/global/plugins/bootstrap/css/*.min.css'])
    .pipe(rtlcss())
    .pipe(rename({suffix: '-rtl'}))
    .pipe(gulp.dest('./dist/assets/global/plugins/bootstrap/css'));
});

//*** HTML formatter task
gulp.task('prettify', function () {
  gulp.src('./backoffice/**/*.html').pipe(prettify({
    indent_size: 4,
    indent_inner_html: true,
    unformatted: ['pre', 'code']
  })).pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function () {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(['./backoffice/js/**/*.js', '!node_modules/**'])
  // eslint() attaches the lint output to the "eslint" property
  // of the file object so it can be used by other modules.
    .pipe(lint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(lint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(lint.failAfterError());
});

gulp.task('webserver', function () {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: true
    }));
});