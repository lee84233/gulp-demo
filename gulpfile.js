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
    // 消息提示
    notify = require('gulp-notify'),
    // 删除文件
    del = require('del'),
    // 自动处理全部错误信息防止因为错误而导致 watch不正常工作
    plumber = require('gulp-plumber'),
    // 仅传递更改过的文件
    changed = require('gulp-changed');
    // 自动检测刷新
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload;





// Path
var htmlPath = './view/*.{html,php}';

var cssSrc = './src/css/';
var cssDest = './view/assets/css/';

var jsSrc = './src/js/';
var jsDest = './view/assets/js/';





//默认任务
gulp.task('default',['serve']);

// 静态服务器 + 监听 scss/html 文件
gulp.task('serve', function() {

    browserSync.init({
        // 静态服务器
        server: {
            baseDir: "./view",
        },
        // 默认打开浏览器
        browser: "chrome",
        //不显示在浏览器中的任何通知。
        notify: false

        // 代理
        // proxy: "你的域名或IP"
    });

    gulp.watch(cssSrc+'*.scss',['css_clean']);
    gulp.watch(cssSrc+'*.min.css',['css_minCss']);
    gulp.watch([cssSrc+'*.css','!src/css/*.min.css'],['css_css']);

    gulp.watch('src/js/*.js',['js_deal']);
    gulp.watch('src/images/**/*',['copy_images']);
    gulp.watch('src/plugins/**/*',['copy_plugins']);
    gulp.watch('view/*.{html,php}').on('change', reload);

});





/**
 * 编译sass
 * @author Lee
 * @date 2016-07-04
 */
gulp.task('css_sass',function(){
    return gulp.src( [cssSrc+'*.scss','!src/css/*.lcno.scss'] )

    // `changed` 任务需要提前知道目标目录位置
    // 才能找出哪些文件是被修改过的
    // .pipe( changed( cssDest ) )
    // 只有被更改过的文件才会通过这里

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
    .pipe( gulp.dest( cssDest ) )
    .pipe( reload({stream: true}) );
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

// src css
gulp.task('css_css',function(){
    return gulp.src([cssSrc+'*.css','!./src/css/*.min.css'])
    .pipe( gulp.dest('view/assets/css') )
    .pipe( reload({stream: true}) );
});

// copy css
gulp.task('css_minCss',function(){
    return gulp.src(cssSrc+'*.min.css')
    .pipe( gulp.dest('view/assets/css') )
    .pipe( reload({stream: true}) );
});


// var watch_minJs = gulp.watch('./src/css/*.min.css',['css_minCss']);
/*watch_minJs.on('change',function(){
    console.log('*.min.css有改动.');
});
watch_minJs.on('added',function(){
    console.log('*.min.css有增加.');
});
watch_minJs.on('deleted',function(){
    console.log('*.min.css有删除.');
});*/





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

    .pipe( gulp.dest(jsDest) )

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

/*var watch_minJs = gulp.watch('src/js/*.min.js',['js_deal2']);
watch_minJs.on('change',function(){
    console.log('*.min.js有变动.');
});*/





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
gulp.task('copy_all',
    ['copy_css','js_deal','copy_images','copy_plugins','copy_others','copy_fonts'],
    function(){});

// copy css
gulp.task('copy_css',['css_clean','css_css','css_minCss'], function(){});
// copy fonts
gulp.task('copy_fonts',function(){
    return gulp.src('src/fonts/**')
    .pipe( gulp.dest('view/assets/fonts') )
    .pipe( reload({stream: true}) );
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
    .pipe( gulp.dest('view/assets/others') )
    .pipe( reload({stream: true}) );
});
// 复制插件
gulp.task('copy_plugins',function(){
    return gulp.src('src/plugins/**/*')
    .pipe( gulp.dest('view/assets/plugins/') )
    .pipe( reload({stream: true}) );
});





/*
* 废弃的任务
* livereload 监听文件的改变，需要浏览器安装livereload插件（谷歌浏览器应用市场下载）
* 文件改变后执行的任务里需要加管道  .pipe( livereload() )
 */

 // 浏览器自动刷新，已废弃
 // var livereload = require('gulp-livereload'),

// 监听
// gulp.task('watch',function(){
//     // 监听文件
//     livereload.listen();
//     // 需要监听的文件
//     gulp.watch('src/css/*.scss',['css_clean']);
//     gulp.watch('src/css/*.css',['copy_css']);
//     gulp.watch('src/js/*.js',['js_deal']);
//     gulp.watch('src/images/**/*',['copy_images']);
//     gulp.watch('view/*.{html,php}',['html']);
// });

// 监听html
/*gulp.task('html',function(){
    return gulp.src( htmlPath )
    .pipe( livereload() )
    .pipe( reload({stream: true}) );
});*/