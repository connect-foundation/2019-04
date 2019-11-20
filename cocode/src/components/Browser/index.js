import React, { useState } from 'react';
import * as Styled from './style';

import BackwardButton from './BackwardButton';
import ForwardButton from './ForwardButton';
import ReloadButton from './ReloadButton';

import { KEY_CODE_ENTER } from 'constants/keyCode';

const DEFAULT_URL = 'http://localhost:3000/';

function BrowserHeader({
	onGoBackward,
	onGoForward,
	onReload,
	addressInputURL,
	handleAddressInputKeyDown
}) {
	return (
		<Styled.BrowserHeader>
			<BackwardButton
				className="BrowserHeader-item"
				onClick={onGoBackward}
			/>
			<ForwardButton
				className="BrowserHeader-item"
				onClick={onGoForward}
			/>
			<ReloadButton className="BrowserHeader-item" onClick={onReload} />
			<Styled.AddressInput
				className="BrowserHeader-item"
				type="url"
				aria-label="browserAddress"
				defaultValue={addressInputURL}
				onKeyUp={handleAddressInputKeyDown}
			/>
		</Styled.BrowserHeader>
	);
}

function Browser({ onGoBackward, onGoForward, onReload, url }) {
	const [addressInputURL, setAddressInput] = useState(
		url ? url : DEFAULT_URL
	);
	const [currentURL, setCurrentURL] = useState(url ? url : DEFAULT_URL);

	const handleAddressInputKeyDown = ({ keyCode, target: { value } }) => {
		setAddressInput(value);
		if (keyCode === KEY_CODE_ENTER) setCurrentURL(value);
	};

	return (
		<Styled.Browser>
			<BrowserHeader
				onGoBackward={onGoBackward}
				onGoForward={onGoForward}
				onReload={onReload}
				addressInputURL={addressInputURL}
				handleAddressInputKeyDown={handleAddressInputKeyDown}
			/>
			<Styled.Iframe src={currentURL} />
		</Styled.Browser>
	);
}

export default Browser;
