import 'reflect-metadata'
import dotenv from 'dotenv';
import { fetch, Headers } from 'undici';

// @ts-ignore
global.fetch = fetch
// @ts-ignore
global.Headers = Headers

console.log(global.fetch)

dotenv.config({ path: './.env' });
