# Guesstimate Dashboard

A fast, static dashboard built for MBA, consulting, product, and VC interview prep, providing reliable anchor numbers for guesstimation.

## Project Structure
- `index.html`: The main entry point
- `css/styles.css`: Styles for the dashboard
- `js/main.js`: Logic and interactivity (fetches data and renders)
- `data/states.json`: The core data set for India states

## Local Development

You can run this project locally using any simple HTTP server. For example:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (serve)
npx serve .
```

Then visit `http://localhost:8000` or the address provided by your server.

## Deployment to Vercel

This project is configured for Vercel with a `vercel.json` file. To deploy:

1. Install the Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root directory.
3. Follow the prompts to deploy.
