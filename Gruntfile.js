module.exports = function(grunt) {
	var app_files = ['app/js/modules.js', 'app/js/*/*.js'],
		output = 'app/js/main.js',
		test_output = 'test/built.js';

// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 3000,
					protocol: 'http',
					hostname: '*',
					base: './app',
					keepalive: true,
//                    debug: true,
					open: true
				}
			}
		},
		watch: {
			html: {
				files: 'app/html/*.html',
				tasks: ['ngtemplates', 'concat:dist']
			},
			js: {
				files: app_files,
				tasks: ['concat:dist']
			},
			sass: {
				files: ['sass/*.scss'],
				tasks: ['sass:dist']
			}
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: app_files,
				dest: output
			},
			test: {
				src: app_files,
				dest: test_output
			}
		},
		karma: {
			options: {
				configFile: 'test/karma-conf.js'
			},
			single: {
				browsers: ['PhantomJS'],
				singleRun: true,
				autoWatch: true
			},
			chrome: {
				browsers: ['Chrome'],
				singleRun: false,
				autoWatch: true
//				},
//				unit: {
//					singleRun: true
//				},
//				continuous: {
//					background: true
			}
		},

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},
				files: {
					'app/css/main.css': 'sass/main.scss'
				}
			},
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'app/css/main.min.css': 'sass/main.scss'
				}
			}
		}
	});

	// Before generating any new files, remove any previously-created files.


	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
//	grunt.loadNpmTasks('grunt-contrib-compass');
//	grunt.loadNpmTasks('grunt-protractor-runner');
//	grunt.loadNpmTasks('grunt-run');

	grunt.registerTask('local', ['connect:server', 'watch']);

//	grunt.registerTask('serve', ['karma:continuous:start', 'run:mock_server', 'connect:livereload', 'watch:karma']);

//	grunt.registerTask('unit-test', ['karma:continuous:start', 'watch:karma']);

//	grunt.registerTask('local-e2e-test', ['connect:test',  'protractor:continuous', 'watch:protractor']);

//	grunt.registerTask('test', ['karma:unit:start', 'connect:test', 'run:mock_server', 'protractor:e2e']);

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-sass');
	// Load the plugin that provides the "concat" task.
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('build', ['concat', 'sass']);
};