import {
	FETCH_COCONUT,
	UPDATE_COCONUT_NAME,
	DELETE_COCONUT
} from 'actions/types';

const filterNotChangedById = (list, id) => list.filter(item => item._id !== id);

const fetchCoconut = (_, coconuts) => ({
	coconuts,
	isFetched: true
});

const updateCoconutName = (coconuts, newCoconut) => ({
	coconut: [...filterNotChangedById(coconuts, newCoconut._id), newCoconut],
	isFetched: true
});

const deleteCoconut = (coconuts, { _id }) => ({
	coconut: filterNotChangedById(coconuts, _id),
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
