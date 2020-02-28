#!/usr/bin/env node
'use strict';
const fs = require('fs');
const _  = require('lodash')

const flat_lexicon_fn = './wl_us.tsv'
const json_string_fn = './wl_us-string.json'
const json_lexicon_fn = './wl_us.json'

let flat_lexicon = fs.readFileSync(flat_lexicon_fn, { encoding: 'utf8'});
let words = flat_lexicon.trim().split(/[\r\n]+/);
words = words.map((wd) => wd.toLowerCase());

// console.log(words.slice(0,3));

let limit = 1234567890;
// let limit = 100

// let json_lexicon = '\'' + JSON.stringify(words) + '\'';
let json_string = '["' + words.slice(1,limit).join(',') + '"]';
fs.writeFileSync(json_string_fn, json_string, { encoding: 'utf8' });

fs.writeFileSync(json_lexicon_fn, JSON.stringify(words), { encoding: 'utf8' });



