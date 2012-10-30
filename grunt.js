/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['src/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint min'
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
        browser: true
      },
      globals: {}
    },
    min: {
      dist: {
        src: ['src/move.js'],
        dest: 'build/move.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-yui-compressor');

  // Default task.
  grunt.registerTask('default', 'lint min');

};
