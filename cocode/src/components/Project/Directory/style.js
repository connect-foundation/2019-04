import styled from 'styled-components';

const FileList = styled.div`
	& {
		display: ${({ toggle }) => (toggle ? 'block' : 'none')};
	}
`;

export { FileList };
