import bcrypt from 'bcrypt';

export const hash = (password: string): string => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);
	return hashedPassword;
};
