function selectAllTextAboutFocusedDom() {
	document.execCommand('selectAll', false, null);
}

function changeDivEditable(node, status) {
	node.contentEditable = status;
	node.focus();
}

export { selectAllTextAboutFocusedDom, changeDivEditable };
