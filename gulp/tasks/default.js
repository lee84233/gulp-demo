var gulp = require('gulp'),
	// if条件执行
    gulpif = require('gulp-if'),
	// 获取cmd参数
	argv = require('yargs').argv;
	// 是否清空


	// 需要清空
	var clear = false;
	if( argv.mode=='continue' || !argv.mode ){
	    clear = true;

	    console.log('准备编译工作');
	    gulp.task('default', ['serve','watch']);
	}else if( argv.mode=='compile' ){
		// 不需清空
		clear = false;

	    console.log('编译资源，监听资源');
	    gulp.task('default', ['copy_all','serve','watch']);
	}else if( argv.mode=='del'  ){
	    console.log('删除资源，编译资源，监听资源');
	    gulp.task('default', ['del_all','copy_all','serve','watch']);
	}else{
		console.log('看不懂要执行神马鬼模式');
	}


