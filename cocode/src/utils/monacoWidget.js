class CursorWidget {
	constructor(editor, userName, position) {
		this.editor = editor;
		this.id = userName;
		this.domNode = null;
		this.position = position;
	}

	getId() {
		return this.id;
	}

	getDomNode() {
		if (!this.domNode) {
			this.domNode = document.createElement('div');
			this.domNode.innerHTML = this.id;
			this.domNode.style.background = 'grey';
			this.domNode.id = this.id;
		}
		return this.domNode;
	}

	getPosition() {
		return {
			position: this.position,
			preference: [0]
		};
	}
	updatePosition(position) {
		this.position = position;
		this.editor.layoutContentWidget(this);
	}

	showCursor(position) {
		this.domNode.style.visibility = 'inherit';
		this.position = position;
		this.editor.layoutContentWidget(this);
	}

	hiddenCursor() {
		this.domNode.style.visibility = 'hidden';
		this.editor.layoutContentWidget(this);
	}
}

export { CursorWidget };
