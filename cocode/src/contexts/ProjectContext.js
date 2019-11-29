import PropTypes from 'prop-types';
import { createContext } from 'react';

const ProjectContext = createContext();
ProjectContext.propTypes = {
	code: PropTypes.string
};

export default ProjectContext;
