'use strict';
module.exports = function (grunt) {
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Add vendor prefixed styles
        //SAS
        sass: {// Task
            css: {// Target
                files: [{
                        expand: true,
                        cwd: 'src/scss',
                        src: ['**/*.scss'],
                        dest: 'src/css',
                        rename: function (dest, src) {
                            return dest + '/' + src.replace('scss', 'css');
                        }
                    }]
            }
        },
        clean: {
            css: {
                files: [{
                        src: [
                            'src/css/**/*.*'
                        ]
                    }]
            },
            dist: {
                files: [{
                        src: [
                            'dist/**/*.*'
                        ]
                    }]
            }
        },
        // Watches files for changes and runs tasks based on the changed files
        watch: {
            scss: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass:css', 'autoprefixer:css']
            },
            livereload: {
                options: {livereload: true},
                files: [
                    'src/css/**/*.css',
                    'src/*.html'
                ]
            }
        },
        connect: {
            src: {
                options: {
                    port: 9002,
                    hostname: "0.0.0.0",
                    livereload: '35729',
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('src')
                        ];
                    }
                }
            }
        }
    });
    grunt.registerTask('serve', function () {
        grunt.task.run('clean:css');
        grunt.task.run('sass:css');
        grunt.task.run('autoprefixer:css');
        grunt.task.run('connect:src');
        grunt.task.run('watch');
    });
    grunt.registerTask('build', function () {
        grunt.task.run('clean:css');
        grunt.task.run('clean:dist');
        grunt.task.run('sass:css');
        grunt.task.run('autoprefixer:css');
        grunt.task.run('cssmin:css');
    });
    grunt.registerTask('cssmin:css', function () {
        grunt.file.expand([
            'src/css/**/*.css'
        ]).forEach(function (dir) {
            var id = Math.floor((Math.random() * 10) + 1); //Random id for build
            var distDir = dir.replace('src', 'dist'); //Change dir 'src' to 'dist'
            var cssmin = grunt.config.get('cssmin') || {};
            //Configs
            cssmin[id] = {
                src: dir,
                dest: distDir
            };
            //Set config
            grunt.config.set('cssmin', cssmin);
            //Run task
            grunt.task.run('cssmin:' + id);
        });
    });
    grunt.registerTask('autoprefixer:css', function () {
        grunt.file.expand([
            'src/css/**/*.css'
        ]).forEach(function (dir) {
            var id = Math.floor((Math.random() * 10) + 1); //Random id for build
            var autoprefixer = grunt.config.get('autoprefixer') || {};
            //Configs
            autoprefixer[id] = {
                src: dir,
                dest: dir
            };
            //Set config
            grunt.config.set('autoprefixer', autoprefixer);
            //Run task
            grunt.task.run('autoprefixer:' + id);
        });
    });
};