import React from 'react';
import { LinkButton, AButton, Button } from './style';

function ExampleButton({ style = {}, to = null, href = null, ...props }) {
	if (to) return <LinkButton style={style} {...props} />;

	if (href) return <AButton style={style} {...props} />;

	return <Button style={style} {...props} />;
}

export { ExampleButton as Button };
