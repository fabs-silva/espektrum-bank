import bcrypt from 'bcrypt';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { createWriteStream } from 'node:fs';
import { extname, resolve } from 'node:path';
import { pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const pump = promisify(pipeline);

export async function signUpRoutes(app: FastifyInstance) {
	app.post('/findUserCpf', async (request) => {
		const bodySchema = z.object({
			cpf: z.string(),
		});

		const { cpf } = bodySchema.parse(request.body);

		const user = await prisma.user.findUniqueOrThrow({
			where: {
				cpf,
			},
			include: {
				account: true,
			}
		});
		return user;
	});

	app.post('/findSupervisorCpf', async (request) => {
		const bodySchema = z.object({
			cpf: z.string(),
		});

		const { cpf } = bodySchema.parse(request.body);

		const supervisor = await prisma.supervisor.findUniqueOrThrow({
			where: {
				cpf,
			},
		});

		return supervisor;
	});

	app.post('/registerIndependent', async (request) => {
		const bodySchema = z.object({
			name: z.string(),
			birthday: z.coerce.date(),
			birth_country: z.string(),
			genre_identity: z.string(),
			cpf: z.string(),
			identification: z.string(),
			issuing_body: z.string(),
			issuing_state: z.string(),
			street: z.string(),
			number: z.string(),
			complement: z.string(),
			district: z.string(),
			city: z.string(),
			state: z.string(),
			cep: z.string(),
			email_address: z.string(),
			phone_number: z.string(),
			selfie_url: z.string(),
			account_type: z.string(),
			password: z.string(),
		});

		const {
			name,
			birthday,
			birth_country,
			genre_identity,
			cpf,
			identification,
			issuing_body,
			issuing_state,
			street,
			number,
			complement,
			district,
			city,
			state,
			cep,
			email_address,
			phone_number,
			selfie_url,
			account_type,
			password,
		} = bodySchema.parse(request.body);

		const accountNumber = Math.floor(1000000 + Math.random() * 9000000);

		const hash = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				name,
				birthday,
				birth_country,
				genre_identity,
				cpf,
				identification,
				issuing_body,
				issuing_state,
				addresses: {
					create: [
						{
							street,
							number,
							complement,
							district,
							city,
							state,
							cep,
						},
					],
				},
				emails: {
					create: [
						{
							email_address,
						},
					],
				},
				telephones: {
					create: [
						{
							phone_number,
						},
					],
				},
				selfie_url,
				account: {
					create: {
						account_type,
						account_number: accountNumber,
						password: hash,
					},
				},
			},
			include: {
				addresses: true,
				emails: true,
				telephones: true,
				account: true,
			},
		});

		return user;
	});

	app.post('/registerSupervised', async (request) => {
			const bodySchema = z.object({
				name: z.string(),
				birthday: z.coerce.date(),
				birth_country: z.string(),
				genre_identity: z.string(),
				cpf: z.string(),
				identification: z.string(),
				issuing_body: z.string(),
				issuing_state: z.string(),
				street: z.string(),
				number: z.string(),
				complement: z.string(),
				district: z.string(),
				city: z.string(),
				state: z.string(),
				cep: z.string(),
				email_address: z.string(),
				phone_number: z.string(),
				selfie_url: z.string(),
				account_type: z.string(),
				password: z.string(),
				supervisor_name: z.string(),
				supervisor_birthday: z.coerce.date(),
				supervisor_degree_kinship: z.string(),
				supervisor_genre_identity: z.string(),
				supervisor_cpf: z.string(),
				supervisor_identification: z.string(),
				supervisor_issuing_body: z.string(),
				supervisor_issuing_state: z.string(),
				supervisor_email_address: z.string(),
				supervisor_phone_number: z.string(),
				supervisor_password: z.string(),
			});

			const {
				name,
				birthday,
				birth_country,
				genre_identity,
				cpf,
				identification,
				issuing_body,
				issuing_state,
				street,
				number,
				complement,
				district,
				city,
				state,
				cep,
				email_address,
				phone_number,
				selfie_url,
				account_type,
				password,
				supervisor_name,
				supervisor_birthday,
				supervisor_degree_kinship,
				supervisor_genre_identity,
				supervisor_cpf,
				supervisor_identification,
				supervisor_issuing_body,
				supervisor_issuing_state,
				supervisor_email_address,
				supervisor_phone_number,
				supervisor_password,
			} = bodySchema.parse(request.body);

			const accountNumber = Math.floor(1000000 + Math.random() * 9000000);

			const hashUser = await bcrypt.hash(password, 10);

			let supervisor = await prisma.supervisor.findFirst({
				where: {
					cpf: supervisor_cpf,
				}
			})

			if(!supervisor){
			const hashSupervisor = await bcrypt.hash(supervisor_password, 10);

			supervisor = await prisma.supervisor.create({
				data: {
					name: supervisor_name,
					birthday: supervisor_birthday,
					degree_kinship: supervisor_degree_kinship,
					genre_identity: supervisor_genre_identity,
					cpf: supervisor_cpf,
					identification: supervisor_identification,
					issuing_body: supervisor_issuing_body,
					issuing_state: supervisor_issuing_state,
					emails: {
						create: [
							{
								email_address: supervisor_email_address,
							},
						],
					},
					telephones: {
						create: [
							{
								phone_number: supervisor_phone_number,
							},
						],
					},
					password: hashSupervisor,
				},
				include: {
					emails: true,
					telephones: true
				}
			});
			}
			
			const user = await prisma.user.create({
				data: {
					name,
					birthday,
					birth_country,
					genre_identity,
					cpf,
					identification,
					issuing_body,
					issuing_state,
					addresses: {
						create: [
							{
								street,
								number,
								complement,
								district,
								city,
								state,
								cep,
							},
						],
					},
					emails: {
						create: [
							{
								email_address,
							},
						],
					},
					telephones: {
						create: [
							{
								phone_number,
							},
						],
					},
					selfie_url,
					account: {
						create: {
							account_type,
							account_number: accountNumber,
							password: hashUser,
							supervisor_id: supervisor.id,
						},
					},
				},
				include: {
					addresses: true,
					emails: true,
					telephones: true,
					account: true,
				},
			});

			return user;
	});

	app.post('/uploadSelfie', async (request, reply) => {
		const upload = await request.file({
			limits: {
				fileSize: 5_252_888, //5mb
			},
		});

		if (!upload) {
			return reply.status(400).send();
		}

		const mimetypeRegex = /^(image)\/[a-zA-Z]+/;

		const isValidFileFormat = mimetypeRegex.test(upload.mimetype);

		if (!isValidFileFormat) {
			return reply.status(400).send();
		}

		const fileId = randomUUID();
		const extension = extname(upload.filename);

		const fileName = fileId.concat(extension);

		const writeStream = createWriteStream(
			resolve(__dirname, '..', '..', 'uploads', fileName),
		);

		await pump(upload.file, writeStream);

		const fullUrl = request.protocol.concat('://').concat(request.hostname);
		const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

		return { fileUrl };
	});

}
