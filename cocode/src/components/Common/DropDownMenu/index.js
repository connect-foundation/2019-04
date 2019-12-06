import * as React from 'react';
import { useState } from 'react';
import * as Styled from './style';

function DropDownMenu({ children, menuItems, ...props }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleIsOpen = (e) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
	};
	const handleMenuClose = (handleClick, e) => {
		e.stopPropagation();
		setIsOpen(false);
		handleClick(e);
	};
	return (
		<Styled.DropDownMenu {...props}>
			{React.cloneElement(children, { onClick: handleIsOpen })}
			{isOpen && (
				<Styled.DropDownList>
					{menuItems &&
						menuItems.map(
							({ value, handleClick, ...props }, key) => (
								<Styled.DropDownItem
									onClick={handleMenuClose.bind(
										undefined,
										handleClick
									)}
									{...props}
									key={key}
								>
									{value}
								</Styled.DropDownItem>
							)
						)}
				</Styled.DropDownList>
			)}
		</Styled.DropDownMenu>
	);
}

export default DropDownMenu;
