const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const pdfParse = require('pdf-parse');

/**
 * Retrieves raw text or structured data from a source URL.
 * Supports standard HTTP fetch, Headless Browser (for JS-rendered or bot-protected), and PDF parsing.
 */
async function retrieveSource(url, options = {}) {
    const mode = options.mode || 'fetch'; // 'fetch', 'puppeteer', 'pdf'
    
    if (mode === 'fetch') {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            },
            ...options.fetchOptions
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }
        return await response.text();
    }
    
    if (mode === 'puppeteer') {
        const browser = await puppeteer.launch({ headless: 'new' });
        try {
            const page = await browser.newPage();
            await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
            const navOptions = options.puppeteerOptions || { waitUntil: 'networkidle2' };
            await page.goto(url, navOptions);
            const html = await page.content();
            const text = await page.$eval('body', el => el.innerText);
            
            if (text.includes('Access Denied') || text.includes('Cloudflare') || text.includes('Captcha')) {
                throw new Error('HTTP 403: Request blocked by bot protection.');
            }
            return { html, text };
        } finally {
            await browser.close();
        }
    }
    
    if (mode === 'pdf') {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`PDF Fetch Error ${response.status}`);
        const buffer = await response.buffer();
        const data = await pdfParse(buffer);
        return data.text;
    }
    
    throw new Error(`Unsupported retrieval mode: ${mode}`);
}

module.exports = { retrieveSource };
