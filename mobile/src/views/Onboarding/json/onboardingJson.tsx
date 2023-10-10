import { KeyboardTypeOptions } from 'react-native';
import IndependentAccount from '../../../assets/independent_account.svg';
import SupervisedAccount from '../../../assets/supervised_account.svg';
import { InputJsonType } from '../../Login/json/loginJson';

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
		title: 'Supervisionado',
		description: 'Você escolhe alguém para aprovar suas transações.',
		image: <SupervisedAccount width={80} />,
	},
];

export const basicInfoJson: InputJsonType[] = [
	{
		id: 1,
		label: 'Nome Completo',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 2,
		label: 'País de nascimento',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
];

export const documentsJson: InputJsonType[] = [
	{
		id: 1,
		label: 'CPF',
		inputType: 'text',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 11,
	},
	{
		id: 2,
		label: 'Documento de identificação',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 3,
		label: 'Órgão emissor',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 4,
		label: 'Estado de emissão',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
];

export const addressJson: InputJsonType[] = [
	{
		id: 1,
		label: 'CEP',
		inputType: 'text',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 8,
	},
	{
		id: 2,
		label: 'Rua',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 3,
		label: 'Número',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 4,
		label: 'Complemento (não obrigatório)',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 5,
		label: 'Bairro',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 6,
		label: 'Cidade',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
	{
		id: 7,
		label: 'Estado',
		inputType: 'text',
		keyboardType: 'default' as KeyboardTypeOptions,
	},
];

export const contactsJson: InputJsonType[] = [
	{
		id: 1,
		label: 'Telefone celular (com DDD)',
		inputType: 'text',
		keyboardType: 'phone-pad' as KeyboardTypeOptions,
		maxLength: 11,
	},
	{
		id: 2,
		label: 'Email',
		inputType: 'text',
		keyboardType: 'email-address' as KeyboardTypeOptions,
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
