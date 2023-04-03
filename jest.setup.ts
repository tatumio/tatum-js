import 'reflect-metadata'
import dotenv from 'dotenv';
import { fetch, Headers } from 'undici';

// @ts-ignore
global.fetch = fetch
// @ts-ignore
global.Headers = Headers

dotenv.config({ path: './.env' });
