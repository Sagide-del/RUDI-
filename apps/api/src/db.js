import pg from 'pg';
export const db = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined });
export const query = (text, params) => db.query(text, params);
