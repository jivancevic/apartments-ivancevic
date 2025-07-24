#!/usr/bin/env node

/**
 * Local Development Setup Checker
 * Run with: node local-setup-check.js
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { readFileSync } from 'fs';

console.log('🏠 Checking local development setup for Apartments Ivančević...\n');

const checks = [];

// Check Node.js version
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  if (majorVersion >= 18) {
    checks.push({ name: 'Node.js version', status: '✅', details: nodeVersion });
  } else {
    checks.push({ name: 'Node.js version', status: '❌', details: `${nodeVersion} (need 18+)` });
  }
} catch (error) {
  checks.push({ name: 'Node.js version', status: '❌', details: 'Not found' });
}

// Check if .env file exists
if (existsSync('.env')) {
  checks.push({ name: '.env file', status: '✅', details: 'Found' });
  
  // Check required environment variables
  try {
    const envContent = readFileSync('.env', 'utf8');
    const hasDatabase = envContent.includes('DATABASE_URL=');
    const hasResend = envContent.includes('RESEND_API_KEY=');
    
    // DATABASE_URL not needed for this app
    checks.push({ 
      name: 'DATABASE_URL', 
      status: '✅', 
      details: 'Not needed (in-memory storage)' 
    });
    
    checks.push({ 
      name: 'RESEND_API_KEY', 
      status: hasResend ? '✅' : '⚠️', 
      details: hasResend ? 'Set' : 'Optional - emails will show as console logs' 
    });
  } catch (error) {
    checks.push({ name: '.env parsing', status: '❌', details: 'Cannot read .env file' });
  }
} else {
  checks.push({ name: '.env file', status: '⚠️', details: 'Optional - only needed for email functionality' });
  checks.push({ 
    name: 'RESEND_API_KEY', 
    status: '⚠️', 
    details: 'Optional - emails will show as console logs' 
  });
}

// PostgreSQL not needed - app uses in-memory storage
checks.push({ name: 'Database', status: '✅', details: 'In-memory storage (no setup needed)' });

// Check if node_modules exists
if (existsSync('node_modules')) {
  checks.push({ name: 'Dependencies', status: '✅', details: 'Installed' });
} else {
  checks.push({ name: 'Dependencies', status: '❌', details: 'Run: npm install' });
}

// Display results
console.log('Setup Status:');
console.log('=============');
checks.forEach(check => {
  console.log(`${check.status} ${check.name.padEnd(20)} ${check.details}`);
});

const allGood = checks.every(check => check.status === '✅');

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 All checks passed! You can run: npm run dev');
} else {
  console.log('⚠️  Some issues found. Please fix them before running npm run dev');
  console.log('\nNext steps:');
  
  checks.filter(check => check.status === '❌').forEach(check => {
    if (check.name === '.env file') {
      console.log('• Copy .env.example to .env and fill in your values');
    } else if (check.name === 'PostgreSQL') {
      console.log('• Install PostgreSQL: brew install postgresql@16');
    } else if (check.name === 'PostgreSQL Service') {
      console.log('• Start PostgreSQL: brew services start postgresql@16');
    } else if (check.name === 'Dependencies') {
      console.log('• Install dependencies: npm install');
    } else if (check.name.includes('_URL') || check.name.includes('_KEY')) {
      console.log(`• Add ${check.name} to your .env file`);
    }
  });
}

console.log('\nFor detailed setup instructions, see README.md');