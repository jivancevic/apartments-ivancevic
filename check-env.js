#!/usr/bin/env node

// Quick environment variable checker
console.log('Environment Variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'Set' : 'Not set');

// Load .env if it exists
import { existsSync, readFileSync } from 'fs';

if (existsSync('.env')) {
  console.log('\n.env file contents:');
  try {
    const envContent = readFileSync('.env', 'utf8');
    console.log(envContent);
  } catch (error) {
    console.log('Error reading .env file:', error.message);
  }
} else {
  console.log('\nNo .env file found');
}