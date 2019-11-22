import styled from 'styled-components';

//TODO 나중에 테마로 분리할 계획입니다.
const EDITOR_MAIN_COLOR = '#1E2022';
const EDITOR_CURRENT_LINT_COLOR = '#2a2f32';

const MonacoEditor = styled.div`
    .monaco-editor-background, .margin {
        background-color: ${EDITOR_MAIN_COLOR} !important;
    }
    
    .scroll-decoration {
        box-shadow: none !important;
    }
    
    .monaco-editor .view-overlays .current-line {
        border: ${EDITOR_CURRENT_LINT_COLOR};
        background-color: ${EDITOR_CURRENT_LINT_COLOR};
    }
`;

export { MonacoEditor };