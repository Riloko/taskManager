import {getData, setData} from "./helpers";

import { generateUUID } from "../utils";

const state = {
	staff: getData('staff') ? getData('staff') : [],
	types: getData('types') ? getData('types') : [
		{
			type_id: "7cabec83-af50-5015-b6c9-2c806d04c39c",
			type_name: "work"
		},
		{
			type_id: "146bc2c9-c5db-54cf-84f4-dfb9aec06477",
			type_name: "person"
		},
		{
			type_id: "964325c8-0da5-528b-b63b-2f69a6828d2c",
			type_name: "meetings"
		},
		{
			type_id: "e5575ac6-3a56-52b5-bff9-b8da975cd236",
			type_name: "calls"
		},
		{
			type_id: "7c8c7361-a363-5b91-9be4-e2c674bafbb6",
			type_name: "unrevised"
		}
	],
	tasks: getData('tasks') ? getData('tasks') : [],
	states: getData('states') ? getData('states') : [
		{
			state_id: "586227be-2023-52e2-b99e-ecb73b0bc411",
			state_name: "new"
		},
		{
			type_id: "c3fbe796-e1da-5813-b8a7-10cf0203b9f8",
			type_name: "in_progress"
		},
		{
			type_id: "24605391-f5ad-5417-951e-38b508664d1b",
			type_name: "stopped"
		},
		{
			type_id: "73842faa-78bf-56ae-b6ab-83fa2f566875",
			type_name: "overdue"
		},
		{
			type_id: "3620e9f8-29df-5f6b-89a9-84893a66056d",
			type_name: "done"
		}
	],
	list: getData('list') ? getData('list') : [],
	list_items: getData('list_items') ? getData('list_items') : [],
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
		state.staff.push({...userData, "staff_id": generateUUID()});
		setData('staff', state.staff);
	}
};

export {
	state,
	actions
};
