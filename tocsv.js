#!/bin/node

const fs = require('fs');
let stdin = fs.readFileSync('/dev/stdin').toString();
registrants = JSON.parse(stdin);

console.log("first, last, email");
for (const reg of registrants) {
  console.log(`${reg.first_name}, ${reg.last_name || ''}, ${reg.email}`)
}
