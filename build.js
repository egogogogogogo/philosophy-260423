const fs = require('fs');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_KEY || '';

console.log('Build: Checking Environment Variables...');
console.log('SUPABASE_URL found:', url ? 'Yes' : 'No');
console.log('SUPABASE_KEY found:', key ? 'Yes' : 'No');

const config = `const CONFIG = {
  SUPABASE_URL: "${url}",
  SUPABASE_KEY: "${key}"
};`;

fs.writeFileSync('config.js', config);
console.log('Build: config.js has been generated.');
