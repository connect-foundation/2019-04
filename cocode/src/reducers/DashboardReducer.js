import {
	FETCH_COCONUT,
	UPDATE_COCONUT_NAME,
	DELETE_COCONUT
} from 'actions/types';

const fetchCoconut = (_, coconuts) => ({
	coconuts,
	isFetched: true
});

const updateCoconutName = ({ coconuts }, newCoconut) => ({
	coconuts: coconuts.map(coconut =>
		coconut._id !== newCoconut._id ? coconut : newCoconut
	),
	isFetched: true
});

const deleteCoconut = ({ coconuts }, { _id }) => ({
	coconuts: coconuts.filter(coconut => coconut._id !== _id),
	isFetched: true
});

function DashBoardReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_COCONUT]: fetchCoconut,
		[UPDATE_COCONUT_NAME]: updateCoconutName,
		[DELETE_COCONUT]: deleteCoconut
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default DashBoardReducer;
