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

interface IEmail{
	id: string;
	email_address: string;
	user_id: string;
	supervisor_id: string | null;
}

interface ITelephone{
	id: string;
	phone_number: string;
	user_id: string;
	supervisor_id: string | null
}

interface IUser {
	id: string;
	name: string;
	birthday: Date | '';
	birth_country: string;
	genre_identity: string;
	cpf: string;
	identification: string;
	issuing_body: string;
	issuing_state: string;
	selfie_url: string;
	emails: IEmail[];
	telephones: ITelephone[];
}

interface IPixKey{
	id: string;
	key: string;
	key_type: string;
	account_id: string;
	created_at: Date | '';
}

interface ITransaction{
	id: string;
	type: string;
	debit_credit: string;
	value: number;
	comment: string;
	status: string;
	receiver_id: string;
	account_id: string;
	created_at: Date | '';
	programmed_to: Date | '';
	approved_at: Date | null,
	settled_at: Date | null;
	receiver: IReceiver;
}

interface ISupervisor{
	id: string;
	name: string;
	birthday: Date | '';
	degree_kinship: string;
	genre_identity: string;
	cpf: string;
	identification: string;
	issuing_body: string;
	issuing_state: string;
	password: string;
}

interface IReceiver{
	id: string;
	name: string;
	document_type: string;
	document_number: string;
	pix_key: string;
	bank: string;
}

interface IUser{
	id: string;
	account_type: string;
	account_number: string;
	password: string;
	balance: number;
	user_id: string;
	created_at: Date;
	supervisor_id: string | null;
	pixKeys: IPixKey[];
	supervisor: ISupervisor | null;
	transactions: ITransaction[];
}

interface IUserInfoStore {
	userInfo: IUser | {};
}

export const UserInfoStore = new Store<IUserInfoStore>({
	userInfo: {}
});
