import React, { useContext } from 'react';
import File from '../File';

import ProjectContext from 'contexts/ProjectContext';

function Directory({ child, depth, handleClick }) {
	const { project } = useContext(ProjectContext);
	const { files, selectedFileId } = project;

	return (
		<div>
			{child.map(id => {
				const { type } = files[id];
				const handleClickFile = () => handleClick(id);
				return (
					<div key={id}>
						<File
							className={
								selectedFileId === id && 'Is-selected-file'
							}
							depth={depth}
							handleClick={
								type !== 'directory' && handleClickFile
							}
							{...files[id]}
						/>
						{type === 'directory' && (
							<Directory
								child={files[id].child}
								depth={depth + 1}
								handleClick={handleClick}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Directory;
