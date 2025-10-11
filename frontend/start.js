/**
 * Startup script for the Job Listing frontend
 * This script installs dependencies and starts the React development server
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Print header
console.log(`${colors.bright}${colors.cyan}==================================================${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}Job Listing Frontend - Startup Script${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}==================================================${colors.reset}`);

// Check if node_modules exists
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log(`${colors.yellow}Node modules not found. Installing dependencies...${colors.reset}`);
  try {
    execSync('npm install', { stdio: 'inherit' });
    console.log(`${colors.green}Dependencies installed successfully!${colors.reset}`);
  } catch (error) {
    console.error(`${colors.bright}Error installing dependencies: ${error.message}${colors.reset}`);
    process.exit(1);
  }
} else {
  console.log(`${colors.green}Dependencies already installed.${colors.reset}`);
}

// Start development server
console.log(`\n${colors.magenta}Starting React development server...${colors.reset}`);
console.log(`${colors.bright}${colors.blue}Frontend will be available at http://localhost:3000${colors.reset}`);
console.log(`${colors.bright}Press Ctrl+C to stop the server${colors.reset}`);
console.log(`${colors.bright}${colors.cyan}==================================================${colors.reset}\n`);

try {
  execSync('npm start', { stdio: 'inherit' });
} catch (error) {
  // Most likely a SIGINT (Ctrl+C) which is normal for stopping the server
  if (error.signal === 'SIGINT') {
    console.log(`\n${colors.yellow}Server stopped by user${colors.reset}`);
  } else {
    console.error(`${colors.bright}Error starting development server: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}