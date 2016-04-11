var gulp = require('gulp');
var open =require('gulp-open');
var webserver = require('gulp-webserver');
gulp.task('webserver',function(){
	gulp.src('').pipe(webserver({livereload:true,
	directoryListing:true,
	open:'index.html'}));
});
gulp.task('open',function(){
	gulp.src('index.html').pipe(open({uri:'http://localhost:8000' }))
});
gulp.task('default',['webserver','open']);
