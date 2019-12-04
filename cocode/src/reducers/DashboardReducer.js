import {
	FETCH_COCONUT,
	UPDATE_COCONUT_NAME,
	DELETE_COCONUT
} from 'actions/types';

const fetchCoconut = (_, coconuts) => coconuts;

const updateCoconutName = (coconuts, newCoconut) =>
	coconuts.map(coconut =>
		coconut._id !== newCoconut._id ? coconut : newCoconut
	);

const deleteCoconut = (coconuts, _id) =>
	coconuts.filter(coconut => coconut._id !== _id);

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
