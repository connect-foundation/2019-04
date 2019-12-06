import styled from 'styled-components';
import { MONACO_THEME } from 'constants/theme';

const MonacoEditor = styled.div`
	& {
		visibility: ${({ isFilesEmpty }) =>
			isFilesEmpty ? 'hidden' : 'visible'};
	}
	
	.monaco-editor-background,
	.margin {
		background-color: ${MONACO_THEME.editorMainColor} !important;
	}

	.scroll-decoration {
		box-shadow: none !important;
	}

	.monaco-editor .view-overlays .current-line {
		border: ${MONACO_THEME.editorCurrentLineColor};
		background-color: ${MONACO_THEME.editorCurrentLineColor};
	}
`;

export { MonacoEditor };
