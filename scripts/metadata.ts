#! /usr/bin/env ts-node-script
import fs from 'fs';
import fetch from 'node-fetch';
import { Moo } from '../lib/util/types';

const BASE_URL = 'https://api.gmcafe.io/metadata/gmoo';
const TOTAL_SUPPLY = 333;
const EXPORT_PATH = './lib/static/metadata.json';

const metadata: Moo[] = [];
const promises = [];

for (let id = 1; id <= TOTAL_SUPPLY; id++) {
  promises.push(
    fetch(`${BASE_URL}/${id}.json`)
      .then((res) => res.json())
      .then((json: Moo) =>
        metadata.push({
          ...json,
          id,
        })
      )
  );
}

setInterval(() => console.log(`${metadata.length} fetched so far...`), 250);

Promise.all(promises).then(() => {
  const ordered = metadata.sort((a, b) => a.id - b.id);

  fs.writeFile(EXPORT_PATH, JSON.stringify(ordered), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Done!');
      process.exit(0);
    }
  });
});
