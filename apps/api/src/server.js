import Fastify from 'fastify';

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 3001);

app.get('/health', async () => ({ status: 'ok', service: 'rudi-api' }));
app.get('/v1', async () => ({ name: 'RUDI API', version: 'v1' }));

// API modules are added in product phases. Every protected route must resolve
// membership server-side and scope all database queries to that business.
app.listen({ port, host: '0.0.0.0' }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
