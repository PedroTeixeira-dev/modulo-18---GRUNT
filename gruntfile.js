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
            }
        } 
    })

    grunt.loadNpmTasks('grunt-contrib-less') //importando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-watch') //importando o plugin do watch

    grunt.registerTask('default', ['watch'])
    grunt.registerTask('build', ['less:production'])
}