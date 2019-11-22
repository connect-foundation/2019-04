import ReactDOM from 'react-dom';

const ModalPortal = ({ children }) => {
	const root = document.getElementById('root');
	root.style.overflow = 'hidden';
	const modalElement = document.getElementById('modal');
	return ReactDOM.createPortal(children, modalElement);
};

export default ModalPortal;
