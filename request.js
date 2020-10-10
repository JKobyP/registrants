#!/bin/node

const rp = require('request-promise')
const fs = require('fs');
let conf = fs.readFileSync('token.json').toString();
conf = JSON.parse(conf);
jwt = conf.jwt;
meeting = process.argv[2]
path = `/meetings/${meeting}/registrants`

if (!meeting) {
  console.error("Argument required: meeting id")
  process.exit(1);
}

var options = {
    uri: 'https://api.zoom.us/v2' + path,
    qs: {
      page_size: 100
    },
    auth: {
      //Provide your token here
    		'bearer': jwt
  	},
    headers: {
        'User-Agent': 'Zoom-Jwt-Request',
        'content-type': 'application/json'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (response) {
      //logic for your response
        console.log(JSON.stringify(response.registrants));
    })
    .catch(function (err) {
        // API call failed...
        console.error('API call failed, reason ', err);
    });
