import styled from 'styled-components';
import { TAB_CONTAINER_THEME, INFO_TAB_THEME } from 'constants/theme';

const InfoTab = styled.section`
	& {
		/* temp width */
		width: 15rem;
		display: flex;
		flex-direction: column;
		justify-items: center;

		background-color: ${TAB_CONTAINER_THEME.tabContainerBGColor};
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
		padding: 0.2rem 0;
		word-wrap: break-word;
		overflow-wrap: break-word;
		color: ${({ theme }) => theme.textColor};
	}

	*:focus {
		outline-color: #aaa;
		outline-style: solid;
		outline-width: 1px;
	}

	.name {
		font-size: ${INFO_TAB_THEME.infoProjectNameFontSize};
	}

	.description {
		font-style: ${INFO_TAB_THEME.infoProjectDescriptionFontStyle};
		font-size: ${INFO_TAB_THEME.infoProjectDescriptionFontSize};
	}

	.author {
		font-size: ${INFO_TAB_THEME.infoProjectAuthorFontSize};
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

export { InfoTab, Title, Info, InfoTitleTab, Icon, Button };
