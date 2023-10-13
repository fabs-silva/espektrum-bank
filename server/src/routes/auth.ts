import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function authRoutes(app: FastifyInstance) {
	app.post('/signIn/client', async (request, reply) => {
		const accountSchema = z.object({
			password: z.string(),
			account_number: z.number(),
		});

		const { password, account_number } = accountSchema.parse(request.body);

		const account = await prisma.account.findUniqueOrThrow({
			where: {
				account_number,
			},
		});

		const isPasswordValid = await bcrypt.compare(password, account.password);

		if(!isPasswordValid){
			return reply.status(401).send();
		}

		const token = app.jwt.sign(
			{
				account_number: account.account_number,
				user_id: account.user_id,
			},
			{
				sub: account.id,
				expiresIn: '1 day',
			},
		);

		return { token };

	});

	app.post('/signIn/supervisor', async (request, reply) => {
		const accountSchema = z.object({
			password: z.string(),
			cpf: z.string(),
		});

		const { password, cpf } = accountSchema.parse(request.body);

		const supervisor = await prisma.supervisor.findUniqueOrThrow({
			where: {
				cpf,
			},
		});

		const isPasswordValid = await bcrypt.compare(password, supervisor.password);

		if (!isPasswordValid) {
			return reply.status(401).send();
		}

		const token = app.jwt.sign(
			{
				supervisor_name: supervisor.name,
				cpf: supervisor.cpf,
			},
			{
				sub: supervisor.id,
				expiresIn: '1 day',
			},
		);

		return { token };
	});
}
