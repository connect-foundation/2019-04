function titleSlice(string) {
	const MAX_LENGTH = 12;
	if (string.length <= MAX_LENGTH) return string;

	return string.slice(0, MAX_LENGTH) + '...';
}

export default titleSlice;
