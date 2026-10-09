require('dotenv').config();
const puppeteer = require('puppeteer');
const { createClient } = require('@supabase/supabase-js');
const path = require('path');

async function verify() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  const filePath = `file:///${path.resolve(__dirname, '../index.html').replace(/\\/g, '/')}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  await new Promise(resolve => setTimeout(resolve, 3000));
  await browser.close();
}

verify().catch(console.error);
