module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), // ate essa parte e igual pra todo arquivo grunt
        less: {
            development: {
                files:{
                    'main.css' : 'main.less'
                }
            },
            production : {
                options: {
                    compress: true
                },
                files: {
                    'main.min.css' : 'main.css'
                }
            }
        }, //ate aqui e como se faz a configiracao do less

        sass: { 
            dist: {
                options: {
                    style :'compressed'
                },
                files: {
                    'main2.css' : 'main.scss'
                }
            }
        }, //ate aqui e como se faz a configiracao do sass
        concurrent: {
            target : ['olaGrunt','less','sass']
        }//ate aqui e como se faz a configiracao das tarefas em paralelo
    })

    grunt.registerTask('olaGrunt',function(){
        const done = this.async()
        setTimeout(function(){
            console.log('ola grunt')
            done()
        }, 3000)
        
    })
 
    grunt.loadNpmTasks('grunt-contrib-less') //importando o plugin do less
    grunt.loadNpmTasks('grunt-contrib-sass') //importando o plugin do sass
    grunt.loadNpmTasks('grunt-concurrent') //importando o plugin das tarefas em paralelo

    grunt.registerTask('default', ['concurrent'])
}