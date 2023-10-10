import { KeyboardTypeOptions } from 'react-native';

export type InputJsonType = {
	id: number;
	label: string;
	inputType: 'text' | 'password' | undefined;
	keyboardType: KeyboardTypeOptions;
	maxLength?: number;
};

export const loginPasswordJson: InputJsonType[] = [
	{
		id: 1,
		label: 'Número da conta',
		inputType: 'text',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 7,
	},
	{
		id: 2,
		label: 'Senha',
		inputType: 'password',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 8,
	},
];

export const loginSupervisorJson: InputJsonType[] = [
	{
		id: 1,
		label: 'cpf',
		inputType: 'text',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 11,
	},
	{
		id: 2,
		label: 'Senha',
		inputType: 'password',
		keyboardType: 'numeric' as KeyboardTypeOptions,
		maxLength: 8,
	},
];
