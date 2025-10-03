export const createAlias = (name: string) => {
	const words = name.split(' ');
	// If there is only one word, return the first two characters
	if (words.length < 2) {
		return words[0].slice(0, 2).toUpperCase();
	}

	// Return the first initial of the first and last word
	return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};
