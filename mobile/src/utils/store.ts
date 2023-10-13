import { Store } from 'pullstate';

interface IRegisterClientStore {
	name: string;
	birthday: Date | '';
	birth_country: string;
	genre_identity: string;
	cpf: string;
	identification: string;
	issuing_body: string;
	issuing_state: string;
	street: string;
	number: string;
	complement: string;
	district: string;
	city: string;
	state: string;
	cep: string;
	email_address: string;
	phone_number: string;
	selfie_url: string;
	account_type: string;
	password: string;
	supervisor_name: string | null;
	supervisor_birthday: Date | null;
	supervisor_degree_kinship: string | null;
	supervisor_genre_identity: string | null;
	supervisor_cpf: string | null;
	supervisor_identification: string | null;
	supervisor_issuing_body: string | null;
	supervisor_issuing_state: string | null;
	supervisor_email_address: string | null;
	supervisor_phone_number: string | null;
	supervisor_password: string | null;
}

export const RegisterClientStore = new Store<IRegisterClientStore>({
	name: '',
	birthday: '',
	birth_country: '',
	genre_identity: '',
	cpf: '',
	identification: '',
	issuing_body: '',
	issuing_state: '',
	street: '',
	number: '',
	complement: '',
	district: '',
	city: '',
	state: '',
	cep: '',
	email_address: '',
	phone_number: '',
	selfie_url: '',
	account_type: '',
	password: '',
	supervisor_name: null,
	supervisor_birthday: null,
	supervisor_degree_kinship: null,
	supervisor_genre_identity: null,
	supervisor_cpf: null,
	supervisor_identification: null,
	supervisor_issuing_body: null,
	supervisor_issuing_state: null,
	supervisor_email_address: null,
	supervisor_phone_number: null,
	supervisor_password: null,
});
