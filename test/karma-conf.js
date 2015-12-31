module.exports = function(config){
  config.set({
    //  root path location that will be used to resolve all relative paths in files and exclude sections
    basePath : '../',

    // files to include, ordered by dependencies
    files : [
      // include relevant Angular files and libs
      'test/libs/angular/angular.js',
      'test/libs/angular/angular-route.js',
      'test/libs/angular/angular-resource.js',
      'test/libs/jquery/jquery.js',
      'test/libs/angular/angular-mocks.js',

      // include JS files
      'app/js/modules.js',
      'app/js/services/*.js',
      'app/js/directives/*.js',
      'app/js/controllers/*.js',

      //'for-unit-test/**/*.js',

      // include html template files
      // 'app/partials/directives/*.html',
      // 'app/partials/*.html',

      // include unit test specs
      'test/mocks/*.js',
      // include unit test specs
      //  'test/unit/for-unit-test/*.js',
        'test/unit/*.js'
    ],
    // files to exclude
    exclude : [
      'app/libs/angular/angular-loader.js'
      ,'app/libs/angular/*.min.js'
      ,'app/libs/angular/angular-scenario.js'
    ],

    // karma has its own autoWatch feature but Grunt watch can also do this
    autoWatch : false,

    // testing framework, be sure to install the correct karma plugin
    frameworks: ['jasmine'],

    // browsers to test against, be sure to install the correct browser launcher plugins
    browsers : ['PhantomJS'],

    // map of preprocessors that is used mostly for plugins
    preprocessors: {
      // 'book/partials/directives/*.html': 'html2js',
      // 'book/partials/*.html': 'html2js'

      // test coverage
//      'book/js/controllers/*.js': ['jshint', 'coverage'],
//      'book/js/directives/*.js': ['jshint', 'coverage'],
 //     'book/js/app.js': ['jshint', 'coverage'],
    //  'book/js/fortest/*.js': ['jshint', 'coverage']
    },

    reporters: ['dots'/*, 'progress', 'coverage'*/],

    // list of karma plugins
    plugins : [
      'karma-jshint-preprocessor',
      'karma-coverage',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-phantomjs-launcher'
    ],

    // plugin settings
    ngHtml2JsPreprocessor: {
      stripPrefix: 'book/'
    },
    coverageReporter: {
      // type of file to output, use text to output to console
      type : 'text',
      // directory where coverage results are saved
      dir: 'test-results/coverage/'
      // if type is text or text-summary, you can set the file name
      // file: 'coverage.txt'
    },
    junitReporter: {
      outputFile: 'test-results/junit-results.xml'
    }
})}
