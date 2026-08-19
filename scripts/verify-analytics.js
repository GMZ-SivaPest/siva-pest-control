#!/usr/bin/env node
// Simple script to fetch a URL and check for GA/GTM script presence.

const https = require('https');
const http = require('http');
const url = process.argv[2] || 'http://localhost:3000';

function fetch(u) {
  return new Promise((resolve, reject) => {
    const client = u.startsWith('https') ? https : http;
    client
      .get(u, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
      })
      .on('error', reject);
  });
}

(async () => {
  try {
    const res = await fetch(url);
    console.log('Status:', res.statusCode);
    const hasGtag = /gtag\/js\?id=G-/.test(res.body);
    const hasGtm = /gtm\.js\?id=GTM-/.test(res.body);
    console.log('Contains gtag.js GA4:', hasGtag);
    console.log('Contains gtm.js GTM:', hasGtm);
  } catch (err) {
    console.error('Error fetching URL:', err.message);
    process.exit(1);
  }
})();
