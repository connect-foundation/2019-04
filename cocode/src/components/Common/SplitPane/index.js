import styled from 'styled-components';

import SplitPane from './SplitPane';
import Pane from './Pane';

const SplitPaneContainer = styled(SplitPane)`
	.Resizer {
		box-sizing: border-box;
		background: #000;
		opacity: 0.5;
		z-index: 1;
		background-clip: padding-box;
	}

	.Resizer:hover {
		-webkit-transition: all 1s ease;
		transition: all 1s ease;
	}

	.Resizer.horizontal {
		height: 11px;
		margin: -5px 0;
		border-top: 5px solid rgba(255, 255, 255, 0);
		border-bottom: 5px solid rgba(255, 255, 255, 0);
		cursor: row-resize;
		width: 100%;
	}

	.Resizer.horizontal:hover {
		border-top: 5px solid rgba(0, 0, 0, 0.5);
		border-bottom: 5px solid rgba(0, 0, 0, 0.5);
	}

	.Resizer.vertical {
		width: 11px;
		margin: 0 -5px;
		border-left: 5px solid rgba(255, 255, 255, 0);
		border-right: 5px solid rgba(255, 255, 255, 0);
		cursor: col-resize;
	}

	.Resizer.vertical:hover {
		border-left: 5px solid rgba(0, 0, 0, 0.5);
		border-right: 5px solid rgba(0, 0, 0, 0.5);
	}

	& > * > * {
		height: 100%;
	}
`;

export default SplitPane;
export { Pane, SplitPaneContainer };
