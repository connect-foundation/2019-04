import getTemplate from './contents.template';

const data = [
	{
		_id: '5dd553be4561ae2bae9cb463',
		projectId: '5dd61901353f4858e1b5a9d0',
		name: 'root',
		type: 'directory',
		child: ['5dd553be4561ae2bae9cb45f', '5dd553be4561ae2bae9cb462']
	},
	{
		_id: '5dd553be4561ae2bae9cb45f',
		projectId: '5dd61901353f4858e1b5a9d0',
		name: 'src',
		type: 'directory',
		child: [
			'5dd553be4561ae2bae9cb45d',
			'5dd553be4561ae2bae9cb45e',
			'5dd553be4561ae2bae9cb461'
		]
	},
	{
		name: 'index.js',
		projectId: '5dd61901353f4858e1b5a9d0',
		type: 'js',
		contents: getTemplate('version1'),
		_id: '5dd553be4561ae2bae9cb45d'
	},
	{
		name: 'Jisoo.js',
		projectId: '5dd61901353f4858e1b5a9d0',
		type: 'js',
		contents: getTemplate('Apple'),
		_id: '5dd553be4561ae2bae9cb45e'
	},
	{
		_id: '5dd553be4561ae2bae9cb461',
		projectId: '5dd61901353f4858e1b5a9d0',
		name: 'heera',
		type: 'directory',
		child: ['5dd553be4561ae2bae9cb460']
	},
	{
		name: 'Banana.js',
		projectId: '5dd61901353f4858e1b5a9d0',
		type: 'js',
		contents: getTemplate('Banana'),
		_id: '5dd553be4561ae2bae9cb460'
	},
	{
		name: 'package.json',
		projectId: '5dd61901353f4858e1b5a9d0',
		type: 'npm',
		contents: getTemplate('package'),
		_id: '5dd553be4561ae2bae9cb462'
	}
];

export default data;
