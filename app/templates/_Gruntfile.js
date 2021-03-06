module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jasmine : {
      src : 'dist/**/*.js',
      options : {
        specs : 'spec/**/*.js',
        helpers : [
          'bower_components/jquery/jquery.js',
          'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
        ]
      }
    },
    uglify: { // Minify definitions
      my_target: {
        src: ["dist/jquery.<%= pluginSlugified %>.js"],
        dest: "dist/jquery.<%= pluginSlugified %>.min.js"
      }
    },
    coffee: { // CoffeeScript compilation
      compile: {
        files: {
          "dist/jquery.<%= pluginSlugified %>.js": "src/jquery.<%= pluginSlugified %>.coffee",
          "spec/<%= pluginCapitalized %>Spec.js": "spec/<%= pluginCapitalized %>Spec.coffee",
          "spec/SpecHelper.js": "spec/SpecHelper.coffee"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-coffee-server');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['coffee', 'jasmine']);
  grunt.registerTask('default', ['test']);
};
