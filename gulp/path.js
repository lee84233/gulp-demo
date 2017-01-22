// 开发环境资源路径
var src = './src';
// 生产环境资源路径
var dest = 'view/assets';
// html页面路径
var baseDir = 'view';

/**
 * 目录结构
 * css 		-> 	css
 * js 		-> 	js
 * fonts 	-> 	字体
 * images 	-> 	图片
 * plugins 	-> 	插件
 * others	-> 	其他，eg:flash，视频，音频...
 */

module.exports = {

	baseDir:baseDir,

	src:src,

	dest:dest,

	html:baseDir+'/*.{html,php}',

	css:{
		srcPath:src+'/css',
		src:{
			// 需要编译的scss
			scss:src+'/css/*.scss',
			css:[
				src+'/css/*.css',
				'!'+src+'/css/*.min.css'
			],
			minCss:src+'/css/*.min.css'
		},
		dest:dest+'/css',
		cleanCss:[
			dest+'/css/*.css',
			'!'+dest+'/css/*.min.css'
		]
	},

	js:{
		srcPath:src+'/js',
		src:{
			js:[
				src+'/js/*.js',
				'!'+src+'/js/*.min.js'
			],
			minJs:src+'/js/*.min.js'
		},
		dest:dest+'/js'
	},

	images: {
        src: src + '/images/**/*.{png,jpg,gif,ico}',
        dest: dest + '/images'
    },

    fonts:{
    	src: src + '/fonts/**/*',
    	dest: dest + '/fonts'
    },

    plugins:{
    	src: src + '/plugins/**/*',
    	dest: dest + '/plugins'
    },

    others:{
    	src: src + '/others/**/*',
    	dest: dest + '/others'
    },
};