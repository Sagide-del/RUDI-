import fs from 'node:fs/promises'; import { db } from './db.js';
const sql = await fs.readFile(new URL('../migrations/001_initial.sql', import.meta.url), 'utf8');
await db.query(sql); await db.end(); console.info('RUDI database migrated');
