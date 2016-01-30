module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    watch: {
      files: '<%= jshint.all %>',
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true,
        expr: true
      },
      all: ['Gruntfile.js', 'tasks/**/*.js', 'test/**/*.js']
    },
    clean: {
      actual: [
        'test/actual/**/*.*'
      ]
    },
    copy: {
      fixtures: {
        expand: true,
        cwd: 'test/fixtures/',
        src: ['*.txt'],
        dest: 'test/actual/'
      }
    },
    "regex-replace": {
      noflags: {
        src: ['test/actual/noflags.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced'
          },
          {
            search: 'o[\\w]{3}r([0-9])',
            replace: 'ok$1'
          }
        ]
      },
      emptyflags: {
        src: ['test/actual/emptyflags.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced',
            flags: ''
          }
        ]
      },
      caseinsensitive: {
        src: ['test/actual/caseinsensitive.txt'],
        actions: [
          {
            search: 'field',
            replace: 'replaced',
            flags: 'gi'
          }
        ]
      },
      multiline: {
        src: ['test/actual/multiline.txt'],
        actions: [
          {
            search: '^- ',
            replace: '',
            flags: 'gm'
          }
        ]
      },
      regexpobjectsearch: {
        src: ['test/actual/regexpobjectsearch.txt'],
        actions:[
          {
            name: 'RegExpObjectSearch',
            search: new RegExp('\\[\\d{3}(\\w+)\\]'),
            replace : '[$1]',
          },
          {
            name: 'RegExpObjectSearchSlash',
            search: /\[(\w+)\d{3}\]/,
            replace: '[$1]'
          }
        ]
      },
      replacefunction: {
        src: ['test/actual/replacefunction.txt'],
        actions: [
          {
            name: 'ReplaceFunction',
            search: '[a-z]+\\d+[a-z]+',
            replace: function(){
              return 'foofoofoo';
            }
          }
        ]
      },
      replacefunction2: {
        src: ['test/actual/replacefunction2.txt'],
        actions: [
          {
            name: 'ReplaceFunctionArguments',
            search: new RegExp(/\[(\w+)\]/),
            replace: function(r1, r2) {
              return '[foo' + r2 + ']';
            }
          }
        ]
      },
      globpatterns: {
        src: 'test/actual/glob*.txt',
        actions: [
          {
            name: 'SrcGlobPatternsTarget',
            search: /bar(?:\d?)/,
            replace: 'changed'
          }	
        ]
      },
      singlesrc: {
        src: 'test/actual/singlesrc.txt',
        actions: [
          {
            name: 'SingleSourceTarget',
            search: 'changeme',
            replace: 'changed'
          }	
        ]
      },
      actionsfunction: {
        src: 'test/actual/actionsfunction.txt',
        actions: function() {
          return [{
            name: 'ActionsFunction',
            search: 'foo',
            replace: 'bar'
          }];
        }
      }
    },
    nodeunit: {
      all: ['test/**/*test.js']
    }
  });
  //Load dependency tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Load local tasks.
  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['clean', 'jshint', 'copy:fixtures', 'regex-replace', 'nodeunit']);

};
