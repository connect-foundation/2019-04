import * as React from 'react';
import { useState } from 'react';
import * as Styled from './style';

function DropDownMenu({ children, menuItems, ...props }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleIsOpen = () => setIsOpen(!isOpen);
	const handleMenuClose = () => setIsOpen(false);
	return (
		<Styled.DropDownMenu {...props}>
			{React.cloneElement(children, { onClick: handleIsOpen })}
			{isOpen && (
				<Styled.DropDownList>
					{menuItems &&
						menuItems.map(({ value, onClick, ...props }, key) => (
							<Styled.DropDownItem
								onClick={e => {
									handleMenuClose();
									onClick(e);
								}}
								{...props}
								key={key}
							>
								{value}
							</Styled.DropDownItem>
						))}
				</Styled.DropDownList>
			)}
		</Styled.DropDownMenu>
	);
}

export default DropDownMenu;
