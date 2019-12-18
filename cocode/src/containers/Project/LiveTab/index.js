import React from 'react';
import * as Styled from './style';

import LiveOffTab from 'containers/Project/LiveOffTab';

const TAB_TITLE = 'LIVE';

function LiveTab() {
	return (
		<>
			<Styled.Title>{TAB_TITLE}</Styled.Title>
			<div>
					<LiveOffTab />
			</div>
		</>
	);
}

export default LiveTab;
