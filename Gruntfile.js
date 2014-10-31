'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    uiFramework: {
      
    }, 
    browserSync: {
    	options: {
    		server: {
    			baseDir: "./"
    		},
    		proxy: false
    	}
    }
  });

  grunt.loadNpmTasks('uiFramework');
}