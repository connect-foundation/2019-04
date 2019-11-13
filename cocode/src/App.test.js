import React from 'react';
import {
	cleanup,
	fireEvent,
	render,
	waitForElement,
	getByText,
	wait
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App.js';

afterEach(cleanup);

it('App.js: hello world가 상단에 노출된다', () => {
	expect(true).toBeTruthy();
	const { queryByText } = render(<App />);
	expect(queryByText('Hello! Cocode!!')).toBeInTheDocument();
});

// it("App.js: 버튼을 눌렀을 때 새로운 데이터가 로딩된다", async () => {
//   expect(true).toBeTruthy();
//   const { queryByText } = render(<App />);
//   fireEvent.click(queryByText("loading data"));
//   await waitForElement(() => queryByText("newdata"));
//   expect(queryByText("newdata")).toBeInTheDocument();
//   // expect(queryByText("newdata")).toBeInTheDocument();
// });
