import IndependentAccount from '../../../assets/independent_account.svg';
import SupervisedAccount from '../../../assets/supervised_account.svg';

export type accountTypeJsonType = {
	id: number;
	title: string;
	description: string;
	image: React.JSX.Element;
};

export type StateListType = {
	state: string;
	code: string;
};

export const accountTypeJson: accountTypeJsonType[] = [
	{
		id: 1,
		title: 'Independente',
		description: 'Você tem o controle de todas as suas transações.',
		image: <IndependentAccount width={80} />,
	},
	{
		id: 2,
		title: 'Supervisionada',
		description: 'Você escolhe alguém para aprovar suas transações.',
		image: <SupervisedAccount width={80} />,
	},
];

export const genderIdentityList: string[] = [
	'Mulher cisgênero',
	'Homem cisgênero',
	'Mulher transgênero',
	'Homem transgênero',
	'Não binário',
	'Outro',
];

export const degreeKinshipList: string[] = [
	'Pai/mãe',
	'Irmão/irmã',
	'Avô/avó',
	'Padrasto/madrasta',
	'Primo(a)',
	'Amigo(a)',
	'Tutor(a)',
	'Outro',
];

export const statesList: StateListType[] = [
	{ state: 'Acre', code: 'AC' },
	{ state: 'Alagoas', code: 'AL' },
	{ state: 'Amapá', code: 'AP' },
	{ state: 'Amazonas', code: 'AM' },
	{ state: 'Bahia', code: 'BA' },
	{ state: 'Ceará', code: 'CE' },
	{ state: 'Distrito Federal', code: 'DF' },
	{ state: 'Espírito Santo', code: 'ES' },
	{ state: 'Goiás', code: 'GO' },
	{ state: 'Maranhão', code: 'MA' },
	{ state: 'Mato Grosso', code: 'MT' },
	{ state: 'Mato Grosso do Sul', code: 'MS' },
	{ state: 'Minas Gerais', code: 'MG' },
	{ state: 'Pará', code: 'PA' },
	{ state: 'Paraíba', code: 'PB' },
	{ state: 'Paraná', code: 'PR' },
	{ state: 'Pernambuco', code: 'PE' },
	{ state: 'Piauí', code: 'PI' },
	{ state: 'Rio de Janeiro', code: 'RJ' },
	{ state: 'Rio Grande do Norte', code: 'RN' },
	{ state: 'Rio Grande do Sul', code: 'RS' },
	{ state: 'Rondônia', code: 'RO' },
	{ state: 'Roraima', code: 'RR' },
	{ state: 'Santa Catarina', code: 'SC' },
	{ state: 'São Paulo', code: 'SP' },
	{ state: 'Sergipe', code: 'SE' },
	{ state: 'Tocantins', code: 'TO' },
];
