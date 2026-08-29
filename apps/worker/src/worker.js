const interval = Number(process.env.WORKER_HEARTBEAT_MS ?? 60000);

// The production worker will consume Redis-backed idempotent jobs for imports,
// reminders, appointments and subscription checks. It is intentionally private.
console.info('RUDI worker started');
setInterval(() => console.info('RUDI worker ready'), interval).unref();
process.on('SIGTERM', () => process.exit(0));
