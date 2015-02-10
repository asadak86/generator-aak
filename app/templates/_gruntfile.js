{
    "name": "appname",
    "version": "0.0.0",
    "devDependencies": {
        "grunt": "~0.4.2",
        "grunt-contrib-connect": "~0.6.0",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-cssmin": "~0.7.0"
    }
}

module.exports = function(grunt) {
  grunt.initConfig({
    //task config
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('serve', ['connect']);
  grunt.registerTask('build', ['concat', 'cssmin']);
  grunt.registerTask('default', ['build']);
};

concat: {
    dist: {
        src: ["app/header.html", "app/menu.html", "app/sections/*.html", "app/footer.html"],
        dest: "build/index.html"
    }
},
cssmin: {
    css: {
        files: {
            "build/css/main.css": ["app/css/*.css"]
        }
    }
}

connect: {
    server: {
        options: {
            keepalive: true,
            open: true,
            middleware: function(){
               var middleware = [];

                middleware.push(function(req, res, next) {
                    if (req.url !== "/") return next();

                    res.setHeader("Content-type", "text/html");
                    var html = grunt.file.read("app/header.html");
                    html += grunt.file.read("app/menu.html");

                    var files = grunt.file.expand("app/sections/*.html");

                    for (var i = 0; i < files.length; i++) {
                        html += grunt.file.read(files[i]);
                    }

                    html += grunt.file.read("app/footer.html");
                    res.end(html);
                });

                middleware.push(function(req, res, next){
                    if (req.url !== "/css/main.css") return next();

                    res.setHeader("Content-type", "text/css");
                    var css = "";

                    var files = grunt.file.expand("app/css/*.css");
                    for (var i = 0; i < files.length; i++) {
                         css += grunt.file.read(files[i]);
                    }

                    res.end(css);
                });

                middleware.push(function(req, res){
                    res.statusCode = 404;
                    res.end("Not Found");
                });

                return middleware;

            }
        }
    }
},
