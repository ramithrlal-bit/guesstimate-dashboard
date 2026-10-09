const fs = require('fs');
let r = fs.readFileSync('lib/core/registry.js', 'utf8');
const manual = [
  'digital_5g_users'
];
manual.forEach(m => {
  const regex = new RegExp('"' + m + '":\\s*\\{[^}]+\\}', 'g');
  const match = r.match(regex);
  if (match) {
    const rep = match[0]
      .replace(/"extraction_method":\s*"[^"]+"/, '"extraction_method": "MANUAL_NO_RELIABLE_SOURCE"')
      .replace(/"approved_domain":\s*"[^"]+"/, '"approved_domain": null');
    r = r.replace(regex, rep);
  }
});
fs.writeFileSync('lib/core/registry.js', r);
console.log('Updated manual metrics in registry');
