import React from 'react';
import * as Styled from './style';

function Project({ fillColor }) {
	return (
		<Styled.Svg
			fillColor={fillColor}
			width="27px"
			height="35px"
			viewBox="0 0 27 35"
		>
			<g
				id="Page-1"
				stroke="none"
				strokeWidth="1"
				fill="none"
				fillRule="evenodd"
			>
				<g id="Artboard" transform="translate(-9.000000, -4.000000)">
					<g id="Group" transform="translate(10.000000, 5.000000)">
						<path
							d="M-0.0509045893,0.0321423478 C6.90644841,-0.679879751 11.6986509,-0.679879751 14.3664736,0.0471361603 C17.0902172,0.789391244 19.7759198,1.85926655 20.8152037,2.97215881 C21.6478,3.86372451 22.9723423,6.18364777 24.8335174,9.98511167 L24.8844503,10.0891425 L24.8844503,33.4855284 L-0.5,33.4855284 L-0.5,0.0781031977 L-0.0509045893,0.0321423478 Z"
							id="Path-8"
							className="Target"
							stroke="#A5A6A7"
							fill="#A5A6A7"
							strokeLinejoin="bevel"
						></path>
						<path
							d="M15,3.02954432 L15,9.69621099 L22.5,9.69621099 C21.7189005,7.62915863 20.8985864,6.21361966 20.0390577,5.44959408 C19.1795289,4.6855685 17.499843,3.87888525 15,3.02954432 Z"
							id="Path-10"
							stroke="#1D2022"
							fill="#1D2022"
						></path>
					</g>
				</g>
			</g>
		</Styled.Svg>
	);
}

export default Project;
