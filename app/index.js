'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var OnepageGenerator = yeoman.generators.Base.extend({

    promptUser: function() {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);
        console.log("Creating Project Structure");

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name ?'
        },{
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section ?',
            default: true
        }];



        this.prompt(prompts, function (props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));
    },
    scaffoldFolders: function(){
      this.mkdir("app");
      this.mkdir("app/css");
      this.mkdir("app/sections");
      this.mkdir("build");
      this.mkdir("Archive");
      this.mkdir("Assets");
      this.mkdir("Assets/Artwork");
      this.mkdir("Assets/Copy");
      this.mkdir("Assets/Guidelines");
      this.mkdir("Assets/Images");
      this.mkdir("Assets/Logo & Logotypes");
      this.mkdir("Assets/Typefaces");
      this.mkdir("Assets/Vectors");
      this.mkdir("Creative");
      this.mkdir("Creative/Published");
      this.mkdir("Creative/Published/Version1");
      this.mkdir("Creative/Source");
      this.mkdir("Creative/Source/Version1");
      this.mkdir("Markup");
      this.mkdir("Markup/ui");
      this.mkdir("Markup/ui/javascripts");
      this.mkdir("Markup/ui/media/dist/");
      this.mkdir("Markup/ui/stylesheet/");
      this.mkdir("Markup/ui/stylesheet/css");
      this.mkdir("Markup/ui/stylesheet/sass");
      this.mkdir("Markup/ui/stylesheet/sass");
      this.mkdir("Project Plan");
      this.mkdir("Prototype");
      this.mkdir("Prototype/css");
      this.mkdir("Prototype/images");
      this.mkdir("Prototype/pages");
      this.mkdir("Wireframes");

    },
    copyMainFiles: function(){
      this.copy("_index.html", "Markup/index.html");
      this.copy("_gruntfile.js", "Gruntfile.js");
      this.copy("_package.json", "package.json");
      //this.copy("_main.css", "app/css/main.css");

      var context = {
          site_name: this.appName
      };

      this.template("_index.html", "Markup/index.html", context);
    },
    generateDemoSection: function() {
      if (this.addDemoSection) {
          var done = this.async();
          this.invoke("sak:section", {args: ["Demo Section"]}, function(){
              done();
          });
      } else {
          this.write( "app/menu.html", "");
      }
    },
    install: function() {
      console.log("Bower");
      this.installDependencies({
        bower: true,
        npm: true,
        skipInstall: true,
        callback: function () {
          console.log('Everything is ready!');
        }
      });
    },
    runNpm: function(){
      var done = this.async();
      this.npmInstall([""], function(){
          console.log("\nEverything Setup !!!\n");
          done();
      });
    }

});

module.exports = OnepageGenerator;
