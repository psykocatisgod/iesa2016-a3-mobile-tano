module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				files: {
					'../tano/www/css/style.css' : 'css/main.scss'
				}
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass']
			}
		},
		// cssmin: {
		//   target: {
		//     files: [{
		//       expand: true,
		//       cwd: 'css',
		//       src: ['*.css', '!*.min.css'],
		//       dest: 'css/',
		//       ext: '.min.css'
		//     }]
		//   }
		// }
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['watch']);
}