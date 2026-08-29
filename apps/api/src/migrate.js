import fs from 'node:fs/promises'; import { db } from './db.js';
for (const name of ['001_initial.sql','002_reminder_events.sql']) {
  const sql = await fs.readFile(new URL(`../migrations/${name}`, import.meta.url), 'utf8');
  await db.query(sql);
}
await db.end(); console.info('RUDI database migrated');
