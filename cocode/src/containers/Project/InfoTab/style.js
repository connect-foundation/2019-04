import styled from 'styled-components';
import {
	TAB_CONTAINER_THEME,
	INFO_TAB_THEME,
} from 'constants/theme';

const TabHeader = styled.header`
	& {
		display: flex;
		flex-direction: row;
		background-color: ${TAB_CONTAINER_THEME.tabContainerHeaderBGColor};
	}

	.Tab-header-Side-icons {
		margin: auto 0;
		margin-left: auto;
		margin-right: 1rem;
	}
`;

const TabBody = styled.div`
	& {
		height: 100%;
	}
`;

const Title = styled.h1`
	& {
		padding: ${INFO_TAB_THEME.infoPadding};

		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: ${TAB_CONTAINER_THEME.tabContainerTitleSize};
		font-weight: ${TAB_CONTAINER_THEME.tabContainerTitleWeight};
	}
`;

const Info = styled.div`
	& {
		display: flex;
		flex-direction: column;
		padding: ${INFO_TAB_THEME.infoPadding};

		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-size: 0.7rem;
	}

	& > div {
		padding: 0.5rem;
		word-wrap: break-word;
		overflow-wrap: break-word;
		color: ${({ theme }) => theme.textColor};
	}

	*:focus {
		background-color: ${INFO_TAB_THEME.infoFocusBGColor};
	}

	.name {
		font-size: ${INFO_TAB_THEME.infoProjectFontSize};
	}

	.description {
		font-style: ${INFO_TAB_THEME.infoProjectDescriptionFontStyle};
		font-size: ${INFO_TAB_THEME.infoProjectFontSize};
	}

	.author {
		font-size: ${INFO_TAB_THEME.infoProjectFontSize};
	}
`;

const InfoTitleTab = styled.div`
	& {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 0.25rem;
	}

	& > * {
		color: ${TAB_CONTAINER_THEME.tabContainerTitleColor};
		font-weight: 400;
	}
`;

const Icon = styled.img`
	& {
		height: ${INFO_TAB_THEME.infoModifySVGSize};
		width: ${INFO_TAB_THEME.infoModifySVGSize};
		filter: ${INFO_TAB_THEME.infoModifySVGFilter};
	}

	&:hover {
		cursor: pointer;
		filter: ${INFO_TAB_THEME.infoModifySVGFilterHover};
	}
`;

const Button = styled.button`
	& {
		width: -webkit-fill-available;
		margin: 0.7rem 1rem;
		padding: 0.7rem 2.2rem;
		border-radius: 0.7rem;
		background-color: ${INFO_TAB_THEME.infoDeleteButtonBGColor};
		font-size: 1rem;
		font-weight: 400;
	}

	&:hover {
		background-color: ${INFO_TAB_THEME.infoDeleteButtonBGColorHover};
	}
`;

export { TabHeader, TabBody, Title, Info, InfoTitleTab, Icon, Button };
