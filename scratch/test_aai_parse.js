const https = require('https');
const fs = require('fs');
const pdf = require('pdf-parse');

const url = 'https://www.aai.aero/sites/default/files/traffic-news/TRjul2k26.pdf';
const file = fs.createWriteStream('TRjul2k26.pdf');

https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => {
        let dataBuffer = fs.readFileSync('TRjul2k26.pdf');
        pdf(dataBuffer).then(function(data) {
            const lines = data.text.split('\n');
            let passengersSection = false;
            let domesticValue = null;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].includes('Passengers (in million)')) {
                    passengersSection = true;
                }
                if (passengersSection && lines[i].includes('Domestic')) {
                    // Next line usually contains the numbers
                    const dataLine = lines[i+1].trim();
                    const match = dataLine.match(/^([\d\.]+)\s+([\d\.]+)\s+([-\d\.]+)$/);
                    if (match) {
                        domesticValue = parseFloat(match[1]);
                        break;
                    }
                }
            }
            console.log("Extracted Domestic Passengers (in million):", domesticValue);
        });
    });
  });
}).on('error', function(err) {
  fs.unlink('TRjul2k26.pdf'); 
  console.error(err);
});
