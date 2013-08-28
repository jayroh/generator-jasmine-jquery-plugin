'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _s = require('underscore.string');


var JasmineJqueryPluginGenerator = module.exports = function JasmineJqueryPluginGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(JasmineJqueryPluginGenerator, yeoman.generators.Base);

JasmineJqueryPluginGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'pluginName',
    message: 'What will your plugin be called? Example - "corgify": '
  }, {
    name: 'projectOwner',
    message: 'What is your name?'
  }, {
    name: 'projectOwnerEmail',
    message: 'What is your email?'
  }, {
    name: 'projectURL',
    message: 'Where is the project\'s home on the web?'
  }];

  this.prompt(prompts, function (props) {
    this.pluginName = props.pluginName;
    this.pluginCapitalized = _s.capitalize(this.pluginName);
    this.pluginSlugified = _s.slugify(this.pluginName);
    this.projectOwner = props.projectOwner;
    this.projectOwnerEmail = props.projectOwnerEmail;
    this.projectURL = props.projectURL;

    cb();
  }.bind(this));
};

JasmineJqueryPluginGenerator.prototype.app = function app() {
  this.mkdir('src');
  this.mkdir('dist');
  this.mkdir('demo');
  this.mkdir('spec');
  this.mkdir('spec/javascripts');
  this.mkdir('spec/javascripts/fixtures');

  this.copy('_bower.json', 'bower.json');
  this.template('_package.json', 'package.json');
  this.template('_LICENSE.mkdn', 'LICENSE.mkdn');
  this.template('_README.mkdn', 'README.mkdn');
  this.template('_SpecRunner.html', 'SpecRunner.html');
  this.template('_Gruntfile.js', 'Gruntfile.js');

  this.copy('spec/_SpecHelper.coffee', 'spec/SpecHelper.coffee');
  this.copy('spec/javascripts/fixtures/example.html', 'spec/javascripts/fixtures/example.html');
  this.template('spec/_pluginSpec.coffee', 'spec/' +  this.pluginCapitalized + 'Spec.coffee');
  this.template('src/_plugin.coffee',     'src/jquery.' + this.pluginSlugified + '.coffee');

  this.copy('demo/style.css', 'demo/style.css')
  this.template('demo/_index.html', 'demo/index.html')
};

JasmineJqueryPluginGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
};
