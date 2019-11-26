import React, { useContext } from 'react';
import File from '../File';

import ProjectContext from 'contexts/ProjectContext';

function Directory({ child, depth }) {
	const { project } = useContext(ProjectContext);
	const { files, selectedFileId } = project;

	return (
		<div>
			{child.map(id => {
				const { type } = files[id];
				return (
					<>
						<File
							className={
								selectedFileId === id && 'Is-selected-file'
							}
							key={id}
							depth={depth}
							{...files[id]}
						/>
						{type === 'directory' && (
							<Directory
								child={files[id].child}
								depth={depth + 1}
							/>
						)}
					</>
				);
			})}
		</div>
	);
}

export default Directory;
