const fs = require('fs');
let r = fs.readFileSync('index.html', 'utf8');

r = r.replace(/<span class="l">Smartphone users<\/span>/g, '<span class="l">Smartphone installed base</span>');
r = r.replace(/<span class="l">5G users<\/span>/g, '<span class="l">5G subscriptions</span>');
r = r.replace(/<span class="l">Social media users<\/span>/g, '<span class="l">Social media user identities</span>');
r = r.replace(/<span class="l">OTT subscribers<\/span>/g, '<span class="l">Paid video subscriptions</span>');
r = r.replace(/<span class="l">Mobile gaming users<\/span>/g, '<span class="l">Online gamers</span>');
r = r.replace(/<span class="l">Platform users<\/span>/g, '<span class="l">Platform advertising reach / members</span>'); // Just in case this exact text exists

fs.writeFileSync('index.html', r);
console.log('Updated labels in HTML');
