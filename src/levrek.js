'use strict';

let colors = require('colors');
var program = require('commander');
var request = require('request');

program
  .version(require('../package.json').version)
  .option('-u, --user <username>','username (user)')
  .parse(process.argv);

if (!program.user) {
  console.error('Enter username!'.red);
  return;
}

let options = {
  headers: {
    'User-Agent': 'omerraker'
  }
}

options.url = 'https://api.github.com/users/' + program.user + '/repos';
request.header = {'User-Agent':'omerraker'}

request(options,function (error, response, body) {

  if (error || response.statusCode !== 200) {
    console.error('Failed, try again!'.red);
    return;
  }

  let parsedData = JSON.parse(body);
  console.log('Repository count: '+ parsedData.length);
  for (let a of parsedData) {
    console.log('');
    console.log('Repository Name: '.red + a.name.blue);
    console.log('Stargazers Count: '.red + a.stargazers_count.toString().red);
    console.log('');
    console.log('__________________'.white);
  }
});
