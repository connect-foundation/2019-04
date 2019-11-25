import React from 'react';
import Button from './style';

function CreateButton({ onClick }) {
	return <Button onClick={onClick}>Create Coconut</Button>;
}

export default CreateButton;
