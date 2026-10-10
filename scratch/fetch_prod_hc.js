fetch('https://guesstimate-dashboard.vercel.app/')
  .then(r => r.text())
  .then(text => {
     const matches = text.match(/data-metric="healthcare_[^"]+"/g);
     console.log('Matches:', matches ? matches.length : 0);
  });
