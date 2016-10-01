const gulp = require('gulp'),

    // css
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),

    // js
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),

    // 图片处理
    // imagemin = require('gulp-imagemin'),
    // cache = require('gulp-cache'),
    // pngquant = require('imagemin-pngquant'),

    // 重命名
    rename = require('gulp-rename'),
    // 浏览器自动刷新
    livereload = require('gulp-livereload'),
    // 消息提示
    notify = require('gulp-notify'),
    // 删除文件
    del = require('del'),
    // 自动处理全部错误信息防止因为错误而导致 watch不正常工作
    plumber = require('gulp-plumber');


var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', ['css_sass'], function() {

    browserSync.init({
        // 静态服务器
        server: {
            baseDir: "./view"
        }

        // 代理
        // proxy: "你的域名或IP"
    });

    gulp.watch('src/css/*.scss',['css_clean']);
    gulp.watch('src/css/*.css',['copy_css']);
    gulp.watch('src/js/*.js',['js_deal']);
    gulp.watch('src/images/**/*',['copy_images']);
    gulp.watch('view/*.{html,php}').on('change', reload);
});


// Path
var htmlPath = './view/*.{html,php}';

var cssSrc = './src/css/';
var cssDest = './view/assets/css/';

var jsSrc = './src/js/';
var jsDest = './view/assets/js/';


//默认任务
gulp.task('default',['serve']);


// 监听
// gulp.task('watch',function(){
//     livereload.listen();
//     gulp.watch('src/css/*.scss',['css_clean']);
//     gulp.watch('src/css/*.css',['copy_css']);
//     gulp.watch('src/js/*.js',['js_deal']);
//     gulp.watch('src/images/**/*',['copy_images']);
//     gulp.watch('view/*.{html,php}',['html']);
// });


/**
 * 编译sass
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('css_sass',function(){
    return gulp.src( [cssSrc+'*.scss','!src/css/*.lc-no.scss'] )
    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
    .pipe( sass({
        // nested:默认 嵌套缩进的css代码
        // expanded:没有缩进、扩展的css
        // compact:简洁格式
        // compressed:压缩
        outputStyle:'expanded'
    }) )
    .pipe( autoprefixer({
        browsers: ['last 2 versions', 'ie 6-8', 'Android >= 4.0'],
        cascade: true, //是否美化属性值 默认：true 像这样：
        //-webkit-transform: rotate(45deg);
        //        transform: rotate(45deg);
        remove:true //是否去掉不必要的前缀 默认：true
    }) )
    .pipe( gulp.dest( cssDest ) );
});

/**
 * 压缩css
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('css_clean',['css_sass'],function(){
    return gulp.src( [cssDest+'*.css','!view/assets/css/*.min.css'] )
    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
    // .pipe( notify() )
    .pipe( cleanCSS() )
    .pipe( rename(function(path){
        path.basename += '.min'
    }) )
    .pipe( gulp.dest( cssDest ) )
    // .pipe( livereload() )
    .pipe( reload({stream: true}) );
});


/**
 * js 检测和压缩
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('js_deal', ['js_deal2'],function() {
    return gulp.src( [jsSrc+'*.js','!./src/js/*.min.js'] )
    .pipe( plumber({errorHandler: notify.onError("Error: <%= error.message %>")}) )
    .pipe( jshint() )
    .pipe( jshint.reporter('default') )
    .pipe( uglify() )
    .pipe( rename(function(path){
        path.basename += '.min'
    }) )
    .pipe( gulp.dest( jsDest ) )
    // .pipe( livereload() )
    .pipe( reload({stream: true}) );
});
// *.min.js
gulp.task('js_deal2',function(){
    return gulp.src( jsSrc+'*.min.js' )
    .pipe( gulp.dest( jsDest ) )
    // .pipe( livereload() )
    .pipe( reload({stream: true}) );
});

var watch_minJs = gulp.watch('src/js/*.min.js',['js_deal2']);
watch_minJs.on('change',function(){
    console.log('*.min.js有变动.');
});

// 监听html
gulp.task('html',function(){
    return gulp.src( htmlPath )
    // .pipe( livereload() )
    .pipe( reload({stream: true}) );
});


// 复制插件 监听插件库
gulp.task('copy_plugins',function(){
    return gulp.src('src/plugins/**')
    .pipe( gulp.dest('view/assets/plugins/') );
});
var plugins = gulp.watch('src/plugins/**',['copy_plugins']);
plugins.on('change',function() {
    console.log('Plugin has changed.');
});


/*
*   删除文件
*/
// 清空css
gulp.task('del_css',function(lc){
    del('view/assets/css/**/*',lc);
});
// 清空fonts
gulp.task('del_fonts',function(lc){
    del('view/assets/fonts/**/*',lc);
});
// 清空js
gulp.task('del_js',function(lc){
    del('view/assets/js/**/*',lc);
});
// 清空图片库
gulp.task('del_images',function(lc){
    del('view/assets/images/**/*',lc);
});
// 清空插件库
gulp.task('del_plugins',function(lc){
    del('view/assets/plugins/**/*',lc);
});
// 清空others
gulp.task('del_others',function(lc){
    del('view/assets/others/**/*',lc);
});
// 清空所有生产环境
gulp.task('del_all',
    ['del_css','del_fonts','del_js','del_images','del_plugins','del_others'],
    function(){});


/*
* 复制
*/
// 复制所有
gulp.task('copy_all',function(){
    gulp.run('copy_css','js_deal','js_deal2','copy_images','copy_plugins','copy_others','copy_fonts');
});
// copy css
gulp.task('copy_css',['css_clean'],function(){
    return gulp.src('src/css/*.min.css')
    .pipe( gulp.dest('view/assets/css') );
});
// copy fonts
gulp.task('copy_fonts',function(){
    return gulp.src('src/fonts/**')
    .pipe( gulp.dest('view/assets/fonts') );
});
// copy images
gulp.task('copy_images',function(){
    return gulp.src('src/images/**')
    // .pipe( imagemin() )
    .pipe( gulp.dest('view/assets/images') )
    // .pipe( livereload() )
    .pipe( reload({stream: true}) );
});
// 复制others
gulp.task('copy_others',function(){
    return gulp.src('src/others/**/*')
    .pipe( gulp.dest('view/assets/others') );
});