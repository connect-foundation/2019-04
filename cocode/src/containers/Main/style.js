import styled from 'styled-components';

const Main = styled.section`
    & {
        height: 88vh;
        display: flex;
        margin: 0 8rem;
    }
    
    .Logo-floatRight {
        margin-left: auto;
    }
    
    .Logo-alignCenter {
        align-self: center;
    }
`;

const Description = styled.article`
    & {
        align-self: center;
    }
`;

const Title = styled.h1`
    & {
        font-size: 4.5rem;
        font-weight: 600;
    }
    
    .Title-emphasis {
		color: ${({ theme }) => theme.mainColor};
    }
`;

const SubTitle = styled.h2`
    & {
        font-size: 2.8rem;
        font-weight: 200;
    }
    
    .SubTitle-emphasis {
		color: ${({ theme }) => theme.mainColor};
    }
`;

const Button = styled.button`
    & {
        padding: 0.7rem 2.2rem;
        margin-top: 30px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.mainOpaqueColor};
        font-size: 1.3rem;
        font-weight: 400;
    }
    
    &:hover {
        background-color: ${({ theme }) => theme.mainColor};
    }
`;

export { Main, Description, Title, SubTitle, Button };