module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), // ate essa parte e igual pra todo arquivo grunt
        less: {
            development: {
                files:{
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production : {
                options: {
                    compress: true
                },
                files: {
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        }, //ate aqui e como se faz a configiracao do less
        watch: {
            less: {
                files: ['src/styles/**/*.less'], // quando se usa '/**' estamos referenciando qualquer pasta e quando usamos /* estamos referenciando qualquer arquivo
                tasks: ['less:development']                
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace:{
            dev: {
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.css'  
                        },
                        {
                            match:'ENDERECO_DO_JS',
                            replacement:'../src/scripts/main.js'  
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options:{
                    patterns:[
                        {
                            match:'ENDERECO_DO_CSS',
                            replacement:'./styles/main.min.css'  
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild']
    })

    grunt.loadNpmTasks('grunt-contrib-less') //importando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-watch') //importando o plugin do watch
    grunt.loadNpmTasks('grunt-replace') // importando o plugin de substituir
    grunt.loadNpmTasks('grunt-contrib-htmlmin') // importando o arquivo de minificacao do html
    grunt.loadNpmTasks('grunt-contrib-clean') //usado para limpar pastas, no caso, as temporarias

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production','htmlmin:dist','replace:dist','clean'])
}