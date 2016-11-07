/*jshint esversion: 6 */
(function() {
  "use strict";

  let colors = require('chalk');
  let program = require('commander');
  let request = require('request');

  program
    .version(require('../package.json').version)
    .option('-u, --user <username>','username (user)')
    .option('-s, --short','short by last update date')
    .parse(process.argv);

  if (!program.user) {
    console.error(colors.red('Enter a username!'));
    return;
  }

  let options = {
    headers: {
      'User-Agent': 'omerraker'
    }
  };

  let isShort = program.short ? true : false;

  options.url = 'https://api.github.com/users/' + program.user + '/repos';
  request.header = {'User-Agent':'omerraker'};

  request(options,function (error, response, body) {

    if (error || response.statusCode !== 200) {
      console.error(colors.red('Failed, try again!'));
      return;
    }

    let parsedData = JSON.parse(body);

    if(isShort == true){
      parsedData.sort(function(a,b){
        return new Date(a.updated_at) - new Date(b.updated_at);
      });
    }

    console.log('Repository count: '+ parsedData.length);
    for (let a of parsedData) {
      console.log('');
      console.log(colors.red('Repository Name: ') + colors.blue(a.name));
      console.log(colors.red('Stargazers Count: ') + colors.blue(a.stargazers_count.toString()));
      console.log(colors.red('Last Update: ') + colors.blue(a.updated_at.toString()));
      console.log('');
      console.log(colors.white('__________________'));
    }
  });


})();
