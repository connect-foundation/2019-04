function selectAllTextAboutFocusedDom() {
	document.execCommand('selectAll', false, null);
}

function changeDivEditable(node, status) {
	node.contentEditable = status;
	if (status) node.focus();
}

function copyToClipboard(node) {
	const range = document.createRange();
	range.selectNode(node);
	window.getSelection().removeAllRanges();
	window.getSelection().addRange(range);
	document.execCommand('copy');
}

export { selectAllTextAboutFocusedDom, changeDivEditable, copyToClipboard };
