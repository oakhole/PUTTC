module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 清空已生成
    clean: {
      all: ['dist/**', 'dist/*.*','css/style.css','css/*.map'],
      image: 'dist/images',
      css: ['dist/css','css/style.css','css/*.map'],
      html: 'dist/**/*'
    },
    // 复制源文件
    copy: {
      htmls: {
        files: [
          {expand: true, cwd: './', src: ['*.html'], dest: 'dist'}
        ]
      },
      images: {
        files: [
          {expand: true, cwd: 'images', src: ['**/*.{jpg,jpeg,png,gif,webp,svg}'], dest: 'dist/images'}
        ]
      },
      fonts: {
        files: [
          {expand: true, cwd: 'fonts', src: ['**/*.{eot,svg,ttf,woff,woff2,otf}'], dest: 'dist/fonts'}
        ]
      }
    },
    // 编译 scss
    sass: {
      dist: {
        files: {
          'css/style.css':'css/scss/style.scss'
        }
      }
    },
    // 文件合并
    concat: {
      options: {
        separator: '',
        stripBanners: true
      },
      js: {
        src: ['js/jquery.js','js/bootstrap.js','js/app.js'],
        dest: "dist/js/<%= pkg.name %>.js"
      },
      css: {
        src: ['css/bootstrap.css','css/bootstrap-theme.css','css/font-awesome.css','css/style.css'],
        dest: "dist/css/<%= pkg.name %>.css"
      }
			
    },
    //压缩js
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',				
      },
      build: {
        // 动态文件映射，
        // 当任务运行时会自动在 "src/bin/" 目录下查找 "**/*.js" 并构建文件映射，
        // 添加或删除文件时不需要更新 Gruntfile。
        files: [
          {
            expand: true,     // 启用动态扩展
            cwd: 'dist/js/',      // 源文件匹配都相对此目录
            src: ['**/*.js'], // 匹配模式
            dest: 'dist/js',   // 目标路径前缀
            ext: '.min.js',   // 目标文件路径中文件的扩展名
            extDot: 'first'   // 扩展名始于文件名的第一个点号
          },
        ],
      }
    },
    //压缩css
    cssmin: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',				
      },
      build: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['**/*.css'],
          dest: 'dist/css',
          ext: '.min.css',
          extDot: 'first'
        }]
      }
    },
    // 压缩图片
    imagemin: {
      options: {
        optimizationLevel: 7,
        pngquant: true
      },
      dist: {
        files: [{
          expand: true,
          cwd: "images/",
          src: ["**/*.{jpg,jpeg,png,gif,webp,svg}"],
          dest: "dist/images"
        }]
      }
    },
    // 处理html中css、js 引入合并问题
    // usemin: {
    //   html: 'dist/*.html'
    // },
    // //压缩HTML
    // htmlmin: {
    //   options: {
    //     removeComments: true,
    //     removeCommentsFromCDATA: true,
    //     collapseWhitespace: true,
    //     collapseBooleanAttributes: true,
    //     removeAttributeQuotes: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeOptionalTags: true
    //   },
    //   html: {
    //     files: [
    //       {expand: true, cwd: 'dist', src: ['*.html'], dest: 'dist'}
    //     ]
    //   }
    // }
  });
  
  // 加载任务
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  // grunt.loadNpmTasks('grunt-usemin');
  // grunt.loadNpmTasks('grunt-contrib-htmlmin');

  // 注册任务
  grunt.registerTask('default', ['clean','sass','copy','concat','uglify','cssmin','imagemin']);
  
  // 编译scss
  grunt.registerTask('compile', ['clean:css','sass']);
};