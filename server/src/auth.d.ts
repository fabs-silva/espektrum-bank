import '@fastify/jwt';

declare module '@fastify/jwt' {
	export interface FastifyJWT {
		user: {
			account_id: string;
			account_number: string;
			user_id: string?;
			supervisor_id: string?;
		};
	}
}
