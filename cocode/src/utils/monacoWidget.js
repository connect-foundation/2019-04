class LabelWidget {
	constructor(editor, userName, position, color) {
		this.editor = editor;
		this.id = userName;
		this.domNode = null;
		this.position = position;
		this.color = color;
	}

	getId() {
		return this.id;
	}

	getDomNode() {
		if (!this.domNode) {
			this.domNode = document.createElement('div');
			this.domNode.innerHTML = this.id;
			this.domNode.style.fontSize = '0.5rem';
			this.domNode.style.background = this.color;
			this.domNode.style.color = 'white';
			this.domNode.style.transform = 'translateX(3px)';
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

class CaratWidget {
	constructor(editor, position, color) {
		this.editor = editor;
		this.domNode = null;
		this.position = position;
		this.color = color;
	}

	getId() {
		return this.id;
	}

	getDomNode() {
		if (!this.domNode) {
			this.domNode = document.createElement('div');
			this.domNode.style.background = this.color;
			this.domNode.classList.add('blink');
			this.domNode.style.width = '0.2rem';
			this.domNode.style.height = '1.5rem';
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

export { LabelWidget, CaratWidget };