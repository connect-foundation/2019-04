import React from 'react';
import * as Styled from './style';

import Header from 'containers/Header';
import TabBar from 'components/TabBar';
import ProjectTab from 'containers/ProjectTab';
import Editor from 'containers/Editor';
import Browser from 'components/Browser';

import { TAB_BAR_THEME, BROWSER_THEME } from 'constants/theme';

function Project() {
	return (
		<>
			<Header />
			<Styled.Main>
				<TabBar theme={TAB_BAR_THEME} />
				<ProjectTab />
				<Editor />
				<Browser
					className="Project-main-stretch"
					theme={BROWSER_THEME}
				/>
			</Styled.Main>
		</>
	);
}

export default Project;
