import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  baseURL: process.env.BASE_URL || 'https://the-internet.herokuapp.com',
  skyscannerURL: process.env.SKYSCANNER_URL || 'https://www.skyscanner.com',
  rijkswaterstattURL: process.env.RIJKSWATERSTAAT_URL || 'https://localhost:8070',
  
  // Authentication
  username: process.env.TEST_USERNAME || 'tomsmith',
  password: process.env.TEST_PASSWORD || 'SuperSecretPassword!',
  
  // Rijkswaterstaat credentials
  rijksUsername: process.env.RIJKS_USERNAME || 'beheerdertest',
  rijksPassword: process.env.RIJKS_PASSWORD || 'beheerdertest',
  
  // Browser settings
  headless: process.env.HEADLESS !== 'false',
  
  // Environment
  env: process.env.ENV || 'staging',
};

export const validateConfig = () => {
  if (!config.username || !config.password) {
    throw new Error('❌ TEST_USERNAME and TEST_PASSWORD environment variables are required');
  }
};
