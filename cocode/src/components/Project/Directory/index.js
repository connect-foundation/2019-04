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
					<>
						<File
							className={
								selectedFileId === id && 'Is-selected-file'
							}
							key={id}
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
					</>
				);
			})}
		</div>
	);
}

export default Directory;
