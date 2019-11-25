import React, { useEffect } from 'react';
import * as Styled from './style';

import * as babel from '@babel/core';
import reactPreset from '@babel/preset-react';

function BrowserV1({ code, ...props }) {
	const buildCode = () => {
		try {
			const parsedCode = babel.transform(code, {
				presets: [reactPreset]
			});
			eval(parsedCode.code);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(buildCode, [code]);
	return <Styled.BrowserV1 {...props}></Styled.BrowserV1>;
}

export default BrowserV1;
