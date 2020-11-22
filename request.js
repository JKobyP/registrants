#!/bin/node

const rp = require('request-promise')
const fs = require('fs');
let conf = fs.readFileSync('token.json').toString();
conf = JSON.parse(conf);
let jwt = conf.jwt;
let meeting = process.argv[2]
let occurrence = process.argv.length > 3 && process.argv[3]
let participants = occurrence === "-p";
let path = participants ? `/report/meetings/${meeting}/participants` : `/meetings/${meeting}/registrants`;

if (!meeting) {
  console.error("Usage: request.js <meetingId> [<occurenceId>|-p]")
  process.exit(1);
}
var options = {
    uri: 'https://api.zoom.us/v2' + path,
    qs: {
      page_size: 300,
      occurence_id: !participants ? occurrence : undefined
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

let tocsv = (resp) => {
  let people;
  if (resp.registrants) {
    people = resp.registrants
    console.log("first, last, email");
    for (const p of people) {
      console.log(`${p.first_name}, ${p.last_name || ''}, ${p.email}`)
    }
  }
  if (resp.participants) {
    people = resp.participants;
    console.log("name, email");
    for (const p of people) {
      console.log(`${p.name}, ${p.user_email}`)
    }
  }
}

rp(options)
    .then(function (response) {
      //logic for your response
      tocsv(response)
    })
    .catch(function (err) {
        // API call failed...
        console.error('API call failed, reason ', err);
    });
