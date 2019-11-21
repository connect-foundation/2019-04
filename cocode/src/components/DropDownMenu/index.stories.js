import React from 'react';
import styled from 'styled-components';
import DropDownMenu from '.';

export default {
	title: 'DropDownMenu'
};

const Box = styled.div`
	display: flex;
	flex-direction: row;
	/* flex: 1; */
`;

const Button = styled.button`
	padding: 2rem;
	width: 10rem;
	height: 4rem;
	background-color: #5b5b5b;
`;

export const dropDownMenu = () => {
	const menuItems = [
		{
			value: 'test1',
			onClick: () => alert('test1')
		},
		{
			value: 'test2',
			onClick: () => alert('test2')
		},
		{
			value: 'test3',
			onClick: () => alert('test3')
		},
		{
			value: 'test4',
			onClick: () => alert('test4')
		},
		{
			value: 'test5',
			onClick: () => alert('test5')
		}
	];
	return (
		<Box>
			<DropDownMenu menuItems={menuItems}>
				<button>Test1</button>
			</DropDownMenu>
			<DropDownMenu menuItems={menuItems}>
				<button>Test2</button>
			</DropDownMenu>
			<DropDownMenu menuItems={menuItems}>
				<button>Test3</button>
			</DropDownMenu>
			<DropDownMenu menuItems={menuItems}>
				<Button>custom button</Button>
			</DropDownMenu>
		</Box>
	);
};
