module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // Load all grunt-* packages from package.json
  require('time-grunt')(grunt);       // Display the elapsed execution time of grunt tasks

  var imageminWebp = require('imagemin-webp');

  grunt.initConfig({

    less: {
      style: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: "build/css/style.css.map",
          sourceMapURL: 'style.css.map',
          sourceMapRootpath: '../../',
        },
        files: {
          'build/css/style.css': ['src/less/style.less'],
          'build/css/svg-fallback.css': ['src/less/svg-fallback.less']
        }
      }
    },


    less_colors: {
      start: {
        options: {
          funcName: 'cless'
        },
        files: {
          'src/less/variables.less': ['src/less/variables.less']
        }
      }
    },


    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 9'],
        map: true,
      },
      style: {
        src: 'build/css/style.css'
      }
    },


    cmq: {
      style: {
        files: {
          'build/css/style.min.css': ['build/css/style.min.css']
        }
      }
    },


    cssmin: {
      style: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'build/css/style.min.css': ['build/css/style.min.css']
        }
      }
    },


    concat: {
      main: {
        src: [
          'src/js/script.js',
          'src/js/svgcashing.js',
          'src/js/googlemap.js',
        ],
        dest: 'build/js/script.min.js'
      }
    },


    uglify: {
      start: {
        files: {
          'build/js/script.min.js': ['build/js/script.min.js'],
          'build/js/svgshiv.min.js': ['build/js/svgshiv.min.js'],
          'build/js/svg_fallback.min.js': ['build/js/svg_fallback.min.js'],
        }
      }
    },


    // sprite: {
    //   sprite_large: {
    //     src: 'src/img/sprite-2x/*.png',
    //     dest: 'build/img/sprite-2x.png',
    //     padding: 8,
    //     imgPath: '../img/sprite-2x.png',
    //     destCss: 'src/less/components/sprite-2x.less',
    //     'cssVarMap': function (sprite) {
    //       sprite.name = sprite.name + '-2x';
    //     },
    //   },
    //   sprite: {
    //     src: 'src/img/sprite/*.png',
    //     dest: 'build/img/sprite-1x.png',
    //     padding: 4,
    //     imgPath: '../img/sprite-1x.png',
    //     destCss: 'src/less/components/sprite-1x.less',
    //   }
    // },


    // потребует в package.json:  "grunt-replace": "^0.8.0",
    // replace: {
    //   dist: {
    //     options: {
    //       patterns: [
    //         {
    //           match: /<script src=\"js\/plugins.js/g,
    //           replacement: '<script src="js/plugins.min.js'
    //         },
    //         {
    //           match: /<script src=\"js\/script.js/g,
    //           replacement: '<script src="js/script.min.js'
    //         }
    //       ]
    //     },
    //     files: [
    //       {
    //         expand: true,
    //         src: ['src/*.html']
    //       }
    //     ]
    //   }
    // },


    clean: {
      build: [
        'build/css',
        'build/img',
        'build/js',
        'build/*.html',
      ]
    },


    includereplace: {
      html: {
        src: '*.html',
        dest: 'build/',
        expand: true,
        cwd: 'src/'
      }
    },


    copy: {
      js_vendors: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'src/js/vendors/',
        src: ['**'],
        dest: 'build/js/',
        flatten: 'true',
        filter: 'isFile'
      },
      img: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'src/img/',
        src: ['*.{png,jpg,gif,svg,webp}'],
        dest: 'build/img/',
      },
      img_fav: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'src/img/favicons',
        src: ['*.{png,jpg,gif,svg,webp}'],
        dest: 'build/img/favicons/',
      },
      img_sublime: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'build/img/',
        src: ['*.{png,jpg,gif,svg,webp}'],
        dest: 'src/_html_inc/img/',
      },
      img_fav_sublime: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'build/img/favicons',
        src: ['*.{png,jpg,gif,svg,webp}'],
        dest: 'src/_html_inc/img/favicons/',
      },
      css_min: {
        src: ['build/css/style.css'],
        dest: 'build/css/style.min.css',
      },
      css_add: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'src/less/css/',
        src: ['*.css'],
        dest: 'build/css/',
      },
      fonts: {
        options: {
          mtimeUpdate: true
        },
        expand: true,
        cwd: 'src/font/',
        src: ['*.{eot,svg,woff,woff2,ttf}'],
        dest: 'build/font/',
      }
    },


    imagemin: {
      build: {
        options: {
          optimizationLevel: 7,
          // svgoPlugins: [{ removeXMLProcInst:false }, { removeViewBox: false }, { removeUselessStrokeAndFill: false }]
        },
        files: [{
          expand: true,
          src: ['build/img/*.{png,jpg,gif}', 'build/img/favicons/*.{png,jpg}']
          // src: ['build/img/*.{png,jpg,gif,svg}', 'build/img/favicons/*.{png,jpg}']
        }]
      },
      buildwebp: {
        options: {
          use: [imageminWebp({quality: 50, method: 6})]
        },
        files: [{
          expand: true,
          src: ['build/img/*.{jpg,gif}', 'build/img/logo@*.png']
        }]
      }
    },


    tinypng: {
        options: {
            apiKey: "3mWBACd9Uejfr87O2WCwHv11aI55ugoP",
            checkSigs: true,
            sigFile: 'file_sigs.json',
            summarize: true,
            showProgress: true,
            stopOnImageError: true
        },
        compress_selected: {
            expand: true,
            cwd: 'build/img/',
            dest: 'build/img/',
            src: ['{foo,bar,baz,test}.{jpg,png}']
        },
        compress_fav: {
          expand: true,
          cwd: 'build/img/favicons/',
          src: ['*.{png,jpg}'],
          dest: 'build/img/favicons/'
        },
        compress_all: {
          expand: true,
          cwd: 'build/img/',
          src: ['*.{png,jpg}'],
          dest: 'build/img/'
        }
    },


    svgmin: {
      options: {
        plugins: [
            { removeXMLProcInst:false },  // prevent the XML header from being stripped
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false }
        ]
      },
      dist: {
        expand: true,
        src: ['build/img/*.svg', '!build/img/svg-icons.svg']
      }
    },


    svgstore: {
      options: {
        svg: {
          style: "display: none;",
          "aria-hidden": "true"
        },
        // formatting: {
        //   indent_size: 2
        // }
      },
      default: {
        files: {
          'build/img/svg-icons.svg': ['build/img/icon-*.svg'],
          // 'src/_html_inc/svg.html' : ['build/img/icon-*.svg']
        }
      }
    },


    // grunticon: {
    //   foo: {
    //     files: [{
    //       expand: true,
    //       cwd: 'build/img',
    //       src: ['*.svg', '!svg-icons.svg'],
    //       dest: 'build/img/fallbacks',
    //     }],
    //     options: {
    //       enhanceSVG: true,
    //     }
    //   }
    // },


    watch: {
      style: {
        files: ['src/less/**/*.less'],
        tasks: ['style'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      scripts: {
        files: ['src/js/*.js', 'src/js/vendors/*.js'],
        tasks: ['js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      images: {
        files: ['src/img/**/*.{png,jpg,gif,svg}'],
        tasks: ['img'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      html: {
        files: ['src/*.html', 'src/_html_inc/*.html'],
        tasks: ['includereplace:html'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },


    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/img/*.{png,jpg,gif,svg}',
            'build/*.html',
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/",
          },
          // startPath: "/index.html",
          ghostMode: {
            clicks: true,
            forms: true,
            scroll: false
          }
        }
      }
    },


    // concurrent: {                    // отключил, так как оказывается задачи конкурируют между собой в каждом таске,
    //   task1: [                       // а мне нужно чтобы выполнялись по порядку + поднятие потока занимаете еще доп. время
    //     'less_colors:start',
    //     'newer:less',
    //     'newer:autoprefixer',
    //     'newer:copy:css_min',
    //     'newer:cmq',
    //     'newer:cssmin'
    //   ],
    //   task2: [
    //     'newer:concat',
    //     'newer:uglify'
    //   ],
    // }


    newer: {
      options: {
        override: function(details, include) {
          if (details.task === 'less') {
            checkForNewerImports(details.path, details.time, include);
          }
          /*else if(details.task === 'copy' && details.target === 'img') {
            console.log(details.path);
            include(false);
          }*/
          else {
            include(false);
          }
        }
      }
    },


    // notify_hooks: {
    //   options: {
    //     enabled: true,
    //     max_jshint_notifications: 5, // maximum number of notifications from jshint output
    //     title: "Sedona", // defaults to the name in package.json, or will use project directory's name
    //     // success: true, // whether successful grunt executions should be notified automatically
    //     // duration: 3 // the duration of notification in seconds, for `notify-send only
    //   }
    // },


    notify: {
      imagemin: {
        options: {
            title: 'Imagemin Complete',  // optional
            message: 'All images are ready', //required
        }
      }
    }
  });

  var fs = require('fs');
  var path = require('path');

  function checkForNewerImports(lessFile, mTime, include) {
    fs.readFile(lessFile, "utf8", function(err, data) {
      var lessDir = path.dirname(lessFile),
        regex = /@import "(.+?)(\.less)?";/g,
        shouldInclude = false,
        match;

      while ((match = regex.exec(data)) !== null) {
        // All of my less files are in the same directory,
        // other paths may need to be traversed for different setups...
        var importFile = lessDir + '/' + match[1] + '.less';
        if (fs.existsSync(importFile)) {
          var stat = fs.statSync(importFile);
          if (stat.mtime > mTime) {
            shouldInclude = true;
            break;
          }
        }
      }
      include(shouldInclude);
    });
  }

  grunt.registerTask('default', [
    // 'sprite',              // собираем спрайты в build/img/sprite-1x.png и build/img/sprite-2x.png и записываем для них less-файлы
    'less_colors:start',      // заменяю в less файле цвета на less функции цветов
    'newer:less',             // компилируем стили в          build/css/style.css
    'newer:autoprefixer',     // обрабатываем автопрефиксером build/css/style.css
    'newer:copy:css_min',     // создаем                      build/css/style.min.css
    'newer:cmq',              // объединяем медиа-правила в   build/css/style.min.css
    'newer:cssmin',           // минифицируем                 build/css/style.min.css
    'newer:copy:js_vendors',  // копируем всё из src/js/vendors/ в build/js/
    'newer:concat',           // объединяем все указанные JS-файлы в build/js/script.min.js
    'newer:uglify',           // минифицируем                        build/js/script.min.js
    'newer:copy:css_add',     // копируем дополнительные CSS-файлы из src/less/css/ в build/css/
    'newer:copy:fonts',       // копируем всё из src/font/ в build/font/
    'newer:copy:img_fav',     // копируем всё из src/img/favicons в build/img/favicons
    'newer:copy:img_fav_sublime', // копируем всё из build/img/favicons в src/_html_inc/img/favicons
    'newer:copy:img',         // копируем всё из src/img/ в build/img/
    'newer:copy:img_sublime', // копируем всё из build/img/ в src/_html_inc/img/
    'newer:imagemin',         // минифицируем картинки в build/img/
    'newer:svgmin',           // минифицируем svg в build/img/
    'newer:svgstore',         // собираю один svg общий из всех остальных в build/img (для использования как svg sprite)
    'includereplace:html',    // собираем HTML-файлы в build/
    'browserSync',            // запускаем плюшки автообновления
    'watch'                   // запускаем слежение за изменениями файлов
  ]);


  grunt.registerTask('build', [
    // 'clean:build',         // удаляем build/
    // 'sprite',              // собираем спрайты в build/img/sprite-1x.png и build/img/sprite-2x.png и записываем для них less-файлы
    'less_colors:start',      // заменяю в less файле цвета на less функции цветов
    'newer:less',             // компилируем стили в          build/css/style.css
    'newer:autoprefixer',     // обрабатываем автопрефиксером build/css/style.css
    'newer:copy:css_min',     // создаем                      build/css/style.min.css
    'newer:cmq',              // объединяем медиа-правила в   build/css/style.min.css
    'newer:cssmin',           // минифицируем                 build/css/style.min.css
    'newer:copy:js_vendors',  // копируем всё из src/js/vendors/ в build/js/
    'newer:concat',           // объединяем все указанные JS-файлы в build/js/script.min.js
    'newer:uglify',           // минифицируем                        build/js/script.min.js
    'newer:copy:css_add',     // копируем дополнительные CSS-файлы из src/less/css/ в build/css/
    'newer:copy:fonts',       // копируем всё из src/font/ в build/font/
    'newer:copy:img_fav',     // копируем всё из src/img/favicons в build/img/favicons
    'newer:copy:img',         // копируем всё из src/img/ в build/img/
    'newer:imagemin',         // минифицируем картинки в build/img/
    'newer:svgmin',           // минифицируем svg в build/img/
    'newer:svgstore',         // собираю один svg общий из всех остальных в build/img (для использования как svg sprite)
    'includereplace:html',    // собираем HTML-файлы в build/
  ]);


  grunt.registerTask('js', [
    'newer:copy:js_vendors',
    'newer:concat',
    'newer:uglify',
  ]);


  grunt.registerTask('style', [
    'less_colors:start',
    'newer:less',
    'newer:autoprefixer',
    'copy:css_min',
    'newer:cmq',
    'newer:cssmin'
  ]);


  grunt.registerTask('img', [
    'newer:copy:img_fav',
    'newer:copy:img_fav_sublime',
    'newer:copy:img',
    'newer:copy:img_sublime',
    'newer:imagemin',
    'newer:svgmin',
    'newer:svgstore',
  ]);

  grunt.registerTask('img-tinypng-selected', [
    'tinypng:compress_selected'
  ]);

  grunt.registerTask('img-tinypng-fav', [
    'tinypng:compress_fav'
  ]);

  grunt.registerTask('img-tinypng-all', [
    'tinypng:compress_all'
  ]);

  grunt.registerTask('test', [
    // 'newer:svgstore'
    'newer:svgmin',
    'newer:svgstore'
    // 'imagemin'
    // 'newer:svgstore'

    // 'newer:copy:img_fav_sublime'
    // 'imagemin:buildwebp'
    // 'newer:copy:img'
    // 'newer:imagemin',
    // 'notify:imagemin'
  ]);

  grunt.registerTask('img-svgmin', [
    'svgmin:dist'
  ]);

};
