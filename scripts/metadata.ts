#! /usr/bin/env ts-node-script
import fs from 'fs';
import fetch from 'node-fetch';
import { Moo } from '../lib/util/types';

const URL = 'https://alpha.antistupid.com/metadata/gmoo/all-static.json';
const EXPORT_PATH = './lib/static/metadata.json';

const promise: Promise<Moo[]> = fetch(URL)
  .then((res) => res.json())
  .then((moos: Moo[]) => moos.map((moo, idx) => ({ ...moo, id: idx + 1 })));

setInterval(() => console.log('Fetching...'), 250);

Promise.resolve(promise).then((metadata) => {
  fs.writeFile(EXPORT_PATH, JSON.stringify(metadata), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Done!');
      process.exit(0);
    }
  });
});
