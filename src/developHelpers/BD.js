import {getData, setData} from "./helpers";

function uuid() {
	return (
		Math.random()
			.toString(36)
			.substring(2, 15) +
		Math.random()
			.toString(36)
			.substring(2, 15)
	);
};

const state = {
	staff: getData('staff') ? getData('staff') : []
};

const actions = {
	"REMOVE_STAFF": function (id) {
		const stateWithRemove = state.staff.filter(({ staff_id }) => staff_id !== id);

		state.staff = stateWithRemove;
		setData('staff', stateWithRemove);
	},
	"UPDATE_STAFF": function (id, userData) {
		const index = state.staff.findIndex(({staff_id}) => staff_id === id);
		const updatedUser = {...userData, staff_id: id};
		const updatedArray = [...state.staff.slice(0)];

		updatedArray[index] = updatedUser;
		state.staff = updatedArray;
		setData('staff', state.staff);
	},
	"ADD_STAFF": function (userData) {
		state.staff.push({...userData, "staff_id": uuid()});
		setData('staff', state.staff);
	}
};

export {
	state,
	actions
};
