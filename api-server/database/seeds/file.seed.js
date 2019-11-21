import getTemplate from './contents.template';

const data = [
	{
		_id: '5dd553be4561ae2bae9cb463',
		name: 'root',
		type: 'directory',
		child: [
			'5dd553be4561ae2bae9cb45f',
			'5dd553be4561ae2bae9cb461',
			'5dd553be4561ae2bae9cb462'
		]
	},
	{
		_id: '5dd553be4561ae2bae9cb45f',
		name: 'src',
		type: 'directory',
		child: ['5dd553be4561ae2bae9cb45d', '5dd553be4561ae2bae9cb45e']
	},
	{
		name: 'index.js',
		type: 'js',
		contents: getTemplate('js'),
		_id: '5dd553be4561ae2bae9cb45d'
	},
	{
		name: 'style.css',
		type: 'css',
		contents: getTemplate('css'),
		_id: '5dd553be4561ae2bae9cb45e'
	},
	{
		_id: '5dd553be4561ae2bae9cb461',
		name: 'public',
		type: 'directory',
		child: ['5dd553be4561ae2bae9cb460']
	},
	{
		name: 'index.html',
		type: 'html',
		contents: getTemplate('html'),
		_id: '5dd553be4561ae2bae9cb460'
	},
	{
		name: 'package.json',
		type: 'json',
		contents: getTemplate('package'),
		_id: '5dd553be4561ae2bae9cb462'
	}
];

export default data;
