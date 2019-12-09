import React, { useEffect, useRef, useState } from 'react';
import * as Styled from './style';

import CoconutSpinner from 'components/Common/CoconutSpinner';
import DependencySearchItem from 'components/Project/DependencySearchItem';

import { KEY_CODE_ENTER } from 'constants/keyCode';
import { getDenpendencyListAPICreator } from 'apis/Project';
import useFetch from 'hooks/useFetch';

function DependencySearch() {
	const searchInput = useRef(false);
	const [{ data, loading }, setRequest] = useFetch({});
	const [dependencySearchList, setDependencySearchList] = useState([]);

	const handleSearchTypingEnd = () => {
		const name = searchInput.current.value;
		setRequest(getDenpendencyListAPICreator(name));
	};

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) handleSearchTypingEnd();
	};

	useEffect(() => {
		data && setDependencySearchList(data);
	}, [data]);

	return (
		<article>
			<Styled.SearchBar ref={searchInput} onKeyDown={handleKeyDown} />
			{loading && (
				<Styled.SpinnerContainer>
					<CoconutSpinner />
				</Styled.SpinnerContainer>
			)}
			{data && (
				<Styled.DependencySearchList>
					{dependencySearchList.map(
						({ name, version, versions, github, npm }, index) => {
							return (
								<DependencySearchItem
									key={`dependency${index}`}
									name={name}
									latestVersion={version}
									// 이후에 version을 받아오는 기능 구현할 예정
									// versions={versions}
									github={github}
									npm={npm}
								/>
							);
						}
					)}
				</Styled.DependencySearchList>
			)}
		</article>
	);
}

export default DependencySearch;
