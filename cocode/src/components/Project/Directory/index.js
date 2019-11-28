import React, { useContext } from 'react';
import File from '../File';

import ProjectContext from 'contexts/ProjectContext';

function Directory({ child, depth, ...props }) {
	const { project } = useContext(ProjectContext);
	const { files, selectedFileId } = project;

	return (
		<div>
			{child.map(id => {
				const { type } = files[id];
				const handleClickFile = () => props.handleClick(id);
				const handleEditFimeName = changedName =>
					props.handleEditFileName(id, changedName);

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
							handleEditFimeName={handleEditFimeName}
							{...files[id]}
						/>
						{type === 'directory' && (
							<Directory
								child={files[id].child}
								depth={depth + 1}
								{...props}
							/>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Directory;
