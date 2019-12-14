import styled from 'styled-components';
import { FILE_TAB_THEME} from 'constants/theme';

const TabBar = styled.ul`
    & {
        width: 100%;
        list-style: none;
        display: inline-flex;
        overflow: scroll;
        min-height: 3.1rem;
        background-color: ${FILE_TAB_THEME.fileTabDefaultBGColor};
    }
`;

export { TabBar };