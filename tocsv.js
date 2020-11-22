#!/bin/node

const fs = require('fs');
let stdin = fs.readFileSync('/dev/stdin').toString();
const blob = JSON.parse(stdin);
let people;
if (blob.registrants) {
  people = blob.registrants
  console.log("first, last, email");
  for (const p of people) {
    console.log(`${p.first_name}, ${p.last_name || ''}, ${p.email}`)
  }
}
if (blob.participants) {
  people = blob.participants;
  console.log("name, email, duration (s)");
  for (const p of people) {
    console.log(`${p.name}, ${p.user_email}`)
  }
}

