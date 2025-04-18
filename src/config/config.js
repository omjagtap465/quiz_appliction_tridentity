import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });


// console.log('Loaded ENV:', process.env); // Debugging
// console.log('Loaded ENV:', process.env.NODE_ENV); // Debugging

const parseConfig = (envVar) => {
  if (!process.env[envVar]) return {}; // Prevent JSON parsing errors
  try {
    return JSON.parse(process.env[envVar]);
  } catch (error) {
    console.error(`Error parsing ${envVar}:`, error);
    return {};
  }
};

const config = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    // password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'trichain_db',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
};

export default config;
