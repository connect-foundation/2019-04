function fileHasNoExtension(fileName) {
	const fileNameSplited = fileName.split('.');
	return fileNameSplited.length === 1;
}

function getFileExtension(fileName) {
	if (fileHasNoExtension(fileName)) return 'file';
	return fileName.split('.').pop();
}

export { getFileExtension };
