import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import multipart from '@fastify/multipart';
import 'dotenv/config';
import fastify from 'fastify';
import { resolve } from 'node:path';
import { authRoutes } from './routes/auth';
import { signUpRoutes } from './routes/signup';
import { transactionRoutes } from './routes/transaction';

const app = fastify();

app.register(multipart);

app.register(require('@fastify/static'), {
	root: resolve(__dirname, '../uploads'),
	prefix: '/uploads',
});

app.register(cors, {
	origin: true,
});

app.register(jwt, {
	secret: 'espektrum',
});

app.register(authRoutes);
app.register(signUpRoutes);
app.register(transactionRoutes);

app
	.listen({
		port: 3333,
		host: '0.0.0.0',
	})
	.then(() => {
		console.log('🚀 HTTP server running on http://localhost:3333');
	});
