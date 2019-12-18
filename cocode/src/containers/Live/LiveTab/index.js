import React from 'react';
import * as Styled from './style';

import LiveOnTab from 'containers/Live/LiveOnTab';

const TAB_TITLE = 'LIVE';

function LiveTab() {
	return (
		<>
			<Styled.Title>{TAB_TITLE}</Styled.Title>
			<div>
				<LiveOnTab />
			</div>
		</>
	);
}

export default LiveTab;
