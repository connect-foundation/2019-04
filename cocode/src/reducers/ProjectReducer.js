import { UPDATE_CODE, FETCH_PROJECT } from 'actions/Project';

const INITIAL_CODE = `const { useState } = React;

function App() {
	const [state, setState] = useState('Cocode');
	
	return(
		<>
			<h1>Hi! {state}</h1>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('coconut-root'));
`;

function ProjectReducer(state, { type, payload }) {
	switch (type) {
		case UPDATE_CODE: {
			return { ...state, code: payload };
		}
		case FETCH_PROJECT: {
			// TODO: API server에 fetch 요청 보내서 가져오기
			const fetchedProject = { code: INITIAL_CODE };
			return fetchedProject;
		}
		default: {
			throw new Error(`unexpected action.type: ${type}`);
		}
	}
}

export default ProjectReducer;
