import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

export async function transactionRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
		await request.jwtVerify();
	});
  
	app.get('/userInfo', async (request) => {
		 const account = await prisma.account.findMany({
				where: {
					id: request.user.account_id,
				},
				include: {
					user: true,
					pix_keys: true,
					supervisor: true,
					transactions: {
						include: {
							receiver: true,
						},
						orderBy: {
							created_at: "desc",
						}
				}}
			});

      return { account }
	});

app.get('/transactions/:id', async (request, reply) => {
	const paramsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = paramsSchema.parse(request.params);
	const transaction = await prisma.transaction.findUniqueOrThrow({
		where: {
			id,
		},
	});

	if (transaction.account_id !== request.user.account_id) {
		return reply.status(401).send();
	}

	return transaction;
});

app.get('/pixReceiver', async (request, reply) => {
  const bodySchema = z.object({
    pix_key: z.string(),
  });

  const { pix_key } = bodySchema.parse(request.body);

  const receiver = await prisma.receiver.findUniqueOrThrow({
		where: {
			pix_key,
		},
	});

  return receiver;
  
})

app.post('/transactions/pix', async (request) => {
	const bodySchema = z.object({
  value: z.number(),
  comment: z.string(),
  pix_key: z.string(),
	});

	const { 
    value,
    comment,
    pix_key
  } = bodySchema.parse(request.body);

  let settledDate;
  let status = 'pendente';

  const account = await prisma.account.findUnique({
    where: {
      id: request.user.account_id
    }
  })

  if(account?.account_type === 'independente'){
    settledDate = new Date(Date.now());
    status = 'aprovada';
  }

	const receiver = await prisma.receiver.findUniqueOrThrow({
		where: {
			pix_key,
		}
	});

	const transaction = await prisma.transaction.create({
		data: {
			type: 'pix',
			debit_credit: 'D',
			value,
			receiver_id: receiver.id,
			comment,
      status,
			account_id: request.user.account_id,
      settled_at: settledDate,
		},
	});

	await prisma.account.update({
		where: {
			id: request.user.account_id,
		},
		data: {
			balance: account.balance.plus(value)
		}
	})

	return transaction;
});

app.put('/balanceupdate', async (request) => {
	const bodySchema = z.object({
		value: z.number()
	});

	const account = await prisma.account.findUnique({
    where: {
      id: request.user.account_id
    }
  })

	const { value } = bodySchema.parse(request.body);
	await prisma.account.update({
		where: {
			id: request.user.account_id,
		},
		data: {
			balance: account.balance.plus(value)
		}
	})
});

app.post('/receiver', async (request) => {
	const bodySchema = z.object({
		name: z.string(),
		document_type: z.string(),
		document_number: z.string(),
		pix_key: z.string(),
		bank: z.string()
	});

	const { name, document_type, document_number,	pix_key, bank } = bodySchema.parse(request.body);

	const receiver = await prisma.receiver.create({
		data: {
			name,
			document_type,
			document_number,
			pix_key,
			bank
		}
	});

	return receiver;
})

app.post('/transactions/payment', async (request) => {
	const bodySchema = z.object({
		value: z.number(),
		receiver_document: z.string(),
	});

	const { value, receiver_document } = bodySchema.parse(request.body);

	const receiver = await prisma.receiver.findUnique({
		where: {
			document_number: receiver_document,
		},
	});

	let settledDate;
  let status = 'pendente';

	const account = await prisma.account.findUnique({
		where: {
			id: request.user.account_id,
		},
	});

	if (account?.account_type === 'independente') {
		settledDate = new Date(Date.now());
    status = 'aprovada';
	}

	const transaction = await prisma.transaction.create({
		data: {
			type: 'pagamento',
			debit_credit: 'D',
			value,
      status,
			receiver_id: receiver!.id,
			account_id: request.user.account_id,
			settled_at: settledDate,
		},
	});

	return transaction;
});

app.put('/approve/:id', async (request, reply) => {
const paramsSchema = z.object({
	id: z.string().uuid(),
});

const { id } = paramsSchema.parse(request.params);

let transaction = await prisma.transaction.findUniqueOrThrow({
	where: {
		id,
	},
});

const account = await prisma.account.findUnique({
  where: {
    id: transaction.account_id
  }
})

if (account?.supervisor_id !== request.user.supervisor_id) {
	return reply.status(401).send();
}
transaction = await prisma.transaction.update({
	where: {
		id,
	},
	data: {
    status: 'aprovada',
		approved_at: new Date(Date.now())
	},
});

return transaction;

});

app.put('/reject/:id', async (request, reply) => {
	const paramsSchema = z.object({
		id: z.string().uuid(),
	});

	const { id } = paramsSchema.parse(request.params);

	let transaction = await prisma.transaction.findUniqueOrThrow({
		where: {
			id,
		},
	});

	const account = await prisma.account.findUnique({
		where: {
			id: transaction.account_id,
		},
	});

	if (account?.supervisor_id !== request.user.supervisor_id) {
		return reply.status(401).send();
	}
	transaction = await prisma.transaction.update({
		where: {
			id,
		},
		data: {
			status: 'rejeitada',
		},
	});

	return transaction;
});
}