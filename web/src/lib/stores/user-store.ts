import createPersistentStore from './persistentStore';

const alias = createPersistentStore('alias', 'P');
const name = createPersistentStore('name', '');
const email = createPersistentStore('email', '');

export default {
	alias,
	name,
	email
};
