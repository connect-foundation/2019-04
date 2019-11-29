const DEFAULT_THEME = {
	mainColor: '#2accf9',
	mainOpaqueColor: '#2accf9b3',
	backgroundColor: '#161419',
	blackOpaqueColor: '#000000b3',
	textColor: '#ffffff',

	exceptHeaderHeignt: '88vh',
	headerHeignt: '12vh'
};

const DROPDOWN_THEME = {
	dropdownButtonColor: '#2b2b2b',
	dropdownButtonHoverColor: '#4b4b4b',
	dropdownButtonBorderColor: '#383838',
};

const BROWSER_THEME = {
	browserHeaderBGColor: '#1d2022',
	adressInputBGColor: '#000',
	adressInputTextColor: '#fff',

	browserHeignt: '88vh'
};

const TAB_CONTAINER_THEME = {
	tabContainerBGColor: '#0e0f10',
	tabContainerHeaderBGColor: '#1e202280',
	tabContainerBodyBGColor: '#000000',
	tabContainerTitleColor: '#7E7E7E',

	tabContainerTitleSize: '1.25rem',
	tabContainerTitleWeight: '600'
};

const TAB_BAR_THEME = {
	tabBarBGColor: '#1E2022',
	tabBarSelectedItemBGColor: '#cfcfcf'
};

const PROJECT_CARD_THEME = {
	cardHeight: '8rem',
	cardWidth: '21rem',
	cardBackgroundColor: '#FFFFFF',
	cardTitleFontSize: '1.5rem',
	cardDescriptFontSize: '1.25rem',
	cardTextColor: '#161419',
	buttonBackgroundColor: '#232e36',
	buttonDotColor: '#7c7c7c',
	buttonFontSize: '2rem',
	buttonFontWight: '300'
};

const DEPENDENCY_TAB_THEME = {
	dependencyTextColor: '#ffffff',
	dependencyTabCloseSize: '0.7rem',
	dependencyTabIconSize: '1rem',
	dependencyTabIconColor: '#808080',
	dependencyTabIconHoverColor: '#ffffff',
	dependencyTabSelectBGColor: '#1c2022',
	dependencyTabItemHoverColor: '#2accf944',
	dependencyTabInputBGColor: '#1c2022'
};

const EXPLORER_TAB_CONTAINER_THEME = {
	explorerTabContainerBGColor: '#000',
	explorerTabContainerBodyBGColor: '#000',

	explorerTabContainerFileBGColor: 'transparent',
	explorerTabContainerFileTextColor: '#878788',
	explorerTabContainerFileHoverTextColor: '#fff',
	explorerTabContainerFileHoverBGColor: '#2accf944',
	explorerTabContainerFileNameEditBGColor: '#000',
	explorerTabContainerFileEditBGColor: 'rgba(55, 65, 64, 0.314)',
	explorerTabContainerSelectedFileBGColor: '#2accf944',

	explorerTabContainerIconHoverColor: '#fff',
	explorerTabContainerIconColor: '#878788',

	explorerTabContainerFileTextSize: '1rem',
	explorerTabContainerFileTextWeight: 'lighter'
};

const INFO_TAB_THEME = {
	infoPadding: '0.7rem 1rem',
	infoDeleteButtonBGColor: '#880000ba',
	infoDeleteButtonBGColorHover: '#880000',
	infoModifySVGSize: '1rem',
	infoModifySVGFilter: 'invert(0.455)',
	infoModifySVGFilterHover: 'invert(0.9)',
	infoProjectNameFontSize: '1.5rem',
	infoProjectDescriptionFontSize: '1.35rem',
	infoProjectDescriptionFontStyle: 'italic',
	infoProjectAuthorFontSize: '1.2rem'
};

export {
	DEFAULT_THEME,
	DROPDOWN_THEME,
	BROWSER_THEME,
	TAB_BAR_THEME,
	TAB_CONTAINER_THEME,
	PROJECT_CARD_THEME,
	DEPENDENCY_TAB_THEME,
	INFO_TAB_THEME,
	EXPLORER_TAB_CONTAINER_THEME
};
