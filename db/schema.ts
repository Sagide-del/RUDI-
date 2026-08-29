import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

// The server derives businessId from authenticated membership: browser input
// never chooses a tenant. Every operational query must filter by businessId.
export const businesses = sqliteTable('businesses', {
  id: text('id').primaryKey(), name: text('name').notNull(), slug: text('slug').notNull(),
  type: text('type', { enum: ['barbershop', 'salon'] }).notNull(), ownerUserId: text('owner_user_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => [uniqueIndex('businesses_slug_idx').on(table.slug)]);

export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(), businessId: text('business_id').notNull().references(() => businesses.id),
  name: text('name').notNull(), phone: text('phone').notNull(), whatsappPhone: text('whatsapp_phone'),
  source: text('source').notNull(), lastVisitAt: integer('last_visit_at', { mode: 'timestamp' }),
  frequencyDays: integer('frequency_days'), createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
}, (table) => [uniqueIndex('customers_business_phone_idx').on(table.businessId, table.phone)]);
