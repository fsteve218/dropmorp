global.d = console.log;
const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

const SOURCEPATHS = {
    sassSource : ['scss/*.scss'],
    jsSource:'js/main.js',
    htmlSource:'*.html'
}

// App Paths
const APPPATH = {
    root: './',
    css: 'css'
}

const CSSs = [
    // './node_modules/font-awesome/css/font-awesome.css',
    // './node_modules/bootstrap/dist/css/bootstrap.css'
]


// Sass compile & merge with bootstrap
gulp.task( 'sass', () => {
    var nodeCSS;
    if( CSSs.length > 0 ) nodeCSS = gulp.src(CSSs);
    const sassFiles = gulp.src( SOURCEPATHS.sassSource );

    if( nodeCSS ) var stream = merge( nodeCSS, sassFiles );
    else var stream = sassFiles;
    return stream
        .pipe( sass({outputStyle: 'expanded',errLogToConsole: true}) )
            .on( 'error', sass.logError )
        // .pipe( concat('style.css') )
        .pipe( gulp.dest(APPPATH.css) );
    
})

// Browsersync Server
gulp.task( 'serve', ['sass'], () => {
    browserSync.init([`${APPPATH.css}/*.css`,`${APPPATH.root}/*.html`,`${APPPATH.js}/*.js`],{
        server: {
            baseDir: APPPATH.root
        }
    });
})

gulp.task( 'watch', ['serve'], () => {
    gulp.watch( [SOURCEPATHS.sassSource], ['sass']);
    gulp.watch( [SOURCEPATHS.jsSource, SOURCEPATHS.htmlSource] ).on( 'change', browserSync.reload );
})
gulp.task('default',['watch']);