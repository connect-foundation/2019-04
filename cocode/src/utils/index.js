function getFileExtension(fileName) {
	const fileNameSplited = fileName.split('.');
	if (fileNameSplited.length === 1) return 'file';
	return fileNameSplited[fileNameSplited.length - 1];
}

export { getFileExtension };
