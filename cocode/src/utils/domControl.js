function selectAllTextAboutFocusedDom() {
	document.execCommand('selectAll', false, null);
}

function changeDivEditable(node, status) {
	node.contentEditable = status;
	if (status) node.focus();
}

export { selectAllTextAboutFocusedDom, changeDivEditable };
