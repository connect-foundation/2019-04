import React from 'react';
import { ThemeProvider } from 'styled-components';

import { DEFAULT_THEME } from '../../constants/theme';

export const ThemeDecorator = story => (
	<ThemeProvider theme={DEFAULT_THEME}>{story()}</ThemeProvider>
);
