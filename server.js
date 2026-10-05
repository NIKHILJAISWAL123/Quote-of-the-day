/**
 * Simple HTTP Server for Quote Generator
 * Runs on http://localhost:8080
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const DIST_DIR = path.join(__dirname, 'dist');

// Create server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Parse URL
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

  // Security: prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    filePath = path.join(DIST_DIR, 'app.js');
  }

  // Read and serve file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Quote Generator - Server Running</title>
            <style>
              body { font-family: Arial; margin: 50px; }
              h1 { color: #2ecc71; }
              p { font-size: 16px; }
              code { background: #f0f0f0; padding: 10px; display: block; margin: 10px 0; }
            </style>
          </head>
          <body>
            <h1>✅ Quote of the Day Generator - Server Running!</h1>
            <p>Server is running on port ${PORT}</p>
            <p>To run the application, use: <code>npm run dev</code></p>
            <p>To run tests: <code>npm run test</code></p>
            <p>To view code: Check ./dist folder</p>
            <hr>
            <h2>Available Files:</h2>
            <ul>
              <li>app.js - Main application</li>
              <li>quotes.js - Quote manager</li>
              <li>validators.js - Validation logic</li>
              <li>types.js - Type definitions</li>
            </ul>
          </body>
          </html>
        `);
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Server Error: ${err.message}`);
      }
      return;
    }

    // Determine content type
    const ext = path.extname(filePath);
    let contentType = 'text/plain';
    if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.ts') contentType = 'text/typescript';
    else if (ext === '.json') contentType = 'application/json';
    else if (ext === '.html') contentType = 'text/html';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🌐 Quote Generator HTTP Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n  ✅ Server running on: http://localhost:${PORT}\n`);
  console.log('  Available commands:');
  console.log('    npm run dev              - Run the CLI app');
  console.log('    npm run test             - Run all tests');
  console.log('    npm run test:properties  - Run property-based tests');
  console.log('    npm run build            - Build TypeScript\n');
  console.log('  Press Ctrl+C to stop\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error('Try a different port or kill the existing process.\n');
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});

process.on('SIGINT', () => {
  console.log('\n✅ Server stopped\n');
  process.exit(0);
});
