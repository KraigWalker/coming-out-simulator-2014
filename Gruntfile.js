module.exports = function(grunt) {

  // Project configuration
  grunt.initConfig({
    useminPrepare: {
      htlm:'src/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {html:['dist/index.html']},
    copy: {
      html: {
        src: 'src/index.html', dest: 'dist/index.html'
      },
      sounds: {
        src: 'src/sounds/**', dest: 'dist/sounds/'
      },
      images: {
        src: 'src/img/**', dest: 'dist/img/'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-usemin');

   // Default task(s).
  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', [
      'copy:html',
      'useminPrepare',
      'concat',
      'cssmin',
      'uglify',
      'usemin',
      'copy:sounds',
      'copy:images'
    ]
  );
};
