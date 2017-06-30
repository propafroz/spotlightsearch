var gulp = require('gulp'),
    embedTemplates = require('gulp-angular-embed-templates'),
    inlineNg2Styles = require('gulp-inline-ng2-styles'),
    shell = require('gulp-shell');

const APP_CONFIG = {
  TEMP_DIR: "./temp",
  TEMP_DIST_DIR: "./temp-dist",
  NODE_MODULE_DIR: "./node_modules/spotlight-search",
  LIB_DIR: "./lib"
};


gulp.task('js:build', function() {
    gulp.src(['./src/app/text-search/**/*']).pipe(gulp.dest(APP_CONFIG.TEMP_DIR))
        .pipe(embedTemplates({
            sourceType: 'ts'
        }))
        .pipe(inlineNg2Styles({
            base: APP_CONFIG.TEMP_DIR
        }))
        .pipe(gulp.dest(APP_CONFIG.TEMP_DIST_DIR));
});


gulp.task('js:publish', function() {
    gulp.src([ APP_CONFIG.TEMP_DIST_DIR + '/package.json',
        APP_CONFIG.TEMP_DIST_DIR + '/index.d.ts',
        APP_CONFIG.TEMP_DIST_DIR + '/index.js'
    ]).
    pipe(gulp.dest(APP_CONFIG.NODE_MODULE_DIR))
    gulp.src(['./lib/**/*']).pipe(gulp.dest(APP_CONFIG.NODE_MODULE_DIR));
});


gulp.task('clean:pre', shell.task([
    'rm -rf lib',
    'rm -rf temp',
    'rm -rf temp-dist',
    'rm -rf ./node_modules/spotlight-search'
]));

gulp.task('clean:post', shell.task([
    'rm -rf lib',
    'rm -rf temp',
    'rm -rf temp-dist'
]));
