module.exports = function(grunt) {

  var path = require('path');

  // Core lint target.
  var lint = {
    core: ['grunt.js', 'server.js']
  };

  // Dynamically add a per-exercise lint target.
  grunt.file.expandDirs('exercises/*').forEach(function(dir) {
    var name = path.basename(dir).split(path.sep)[0];
    lint['exercise-' + name] = 'exercises/' + name + '/**/*.js';
  });

  // Plugin linting will be handled by the plugin-specific gruntfile.
  delete lint['exercise-plugins'];

  // For each lint target, add a same-named watch target.
  var watch = {};
  Object.keys(lint).forEach(function(name) {
    watch[name] = {
      files: lint[name],
      tasks: 'lint:' + name
    };
  });

  // Grunt config.
  grunt.initConfig({
    server : {
      port : 8000,
      base : '.'
    },
    lint : lint,
    watch : watch,
    docker : {
      files : [
        'content/**/*.js'
      ]
    }
  });

  var server = require('./server');

  // Override the default grunt "server" task.
  grunt.registerTask('server', 'Start the Bocoup Training server', function(arg) {
    // Get values from config, or use defaults.
    var port = grunt.config('server.port');
    var base = path.resolve(grunt.config('server.base'));

    // Start server.
    server(base, port);

    if (arg === 'watch') {
      // This not only keeps grunt from exiting, but also reports lint errors.
      grunt.task.run('watch');
    } else {
      // This keeps grunt from exiting (no watch).
      this.async();
    }
  });

  grunt.registerTask('docker', 'Generate documentation', function() {
    var done = this.async();

    this.requiresConfig('docker.files');

    grunt.utils.spawn({
      cmd : './node_modules/docker/docker',
      args : grunt.file.expand(grunt.config('docker.files'))
    }, done);
  });

  // Default grunt task.
  grunt.registerTask('default', 'server');
};