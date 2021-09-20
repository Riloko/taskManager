import {getData, setData} from "./helpers";

import { generateUUID } from "../utils";

const state = {
	staff: getData('staff') ? getData('staff') : [],
	types: getData('types') ? getData('types') : [
		{
			types_id: "7cabec83-af50-5015-b6c9-2c806d04c39c",
			types_name: "Работа"
		},
		{
			types_id: "146bc2c9-c5db-54cf-84f4-dfb9aec06477",
			types_name: "Личное"
		},
		{
			types_id: "964325c8-0da5-528b-b63b-2f69a6828d2c",
			types_name: "Встречи"
		},
		{
			types_id: "e5575ac6-3a56-52b5-bff9-b8da975cd236",
			types_name: "Созвоны"
		},
		{
			types_id: "7c8c7361-a363-5b91-9be4-e2c674bafbb6",
			types_name: "Нераспределенное"
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
	color: [
		{
			color_id: "055e0300-49fb-5dbc-a539-7fd225c66a70",
			color_name: "#EA9E3E"
		},
		{
			color_id: "fd2a8231-02a1-5b10-b7d9-482231ccadc3",
			color_name: "#64BBFF"
		},
		{
			color_id: "b954f3a9-5b08-57f5-b05c-58d638293238",
			color_name: "#67D5B1"
		},
		{
			color_id: "d1ed422b-9bea-5d99-a46e-2fc71660cacc",
			color_name: "#7B61FF"
		},
		{
			color_id: "bf585e23-e8bf-5281-bbf6-65e5f1e92430",
			color_name: "#E25618"
		}
	],
	icon: [
		{
			icon_id: "a7a06b27-cb5d-50e9-b127-ac768a21d5b1",
			icon_name: "icon1"
		},
		{
			icon_id: "1a5bfa2b-ffbe-5656-9b72-24f0b6e16507",
			icon_name: "icon2"
		},
		{
			icon_id: "054ab6e0-b52c-52dc-9925-1507e74566fa",
			icon_name: "icon3"
		},
		{
			icon_id: "57d138a7-e83d-5fd6-b3de-2b7c45f09051",
			icon_name: "icon4"
		},
		{
			icon_id: "5a4b0bc1-99cb-57b3-8cca-864c26bb146c",
			icon_name: "icon5"
		},
		{
			icon_id: "94766759-d7d7-5428-a512-35a1d53f10d9",
			icon_name: "icon6"
		},
		{
			icon_id: "ecc826ab-429b-5be0-b53c-82eaf5fb41e0",
			icon_name: "icon7"
		},
		{
			icon_id: "81a01161-9b07-56ce-a929-40012214847d",
			icon_name: "icon8"
		},
		{
			icon_id: "8d085bb5-b000-571d-b0d1-173709d1ac11",
			icon_name: "icon9"
		},
		{
			icon_id: "73965047-eddd-5dbc-b592-68de264114e6",
			icon_name: "icon10"
		},
		{
			icon_id: "ba97b889-f50b-553b-9be5-25f96e43a958",
			icon_name: "icon11"
		},
		{
			icon_id: "b6ba3cdc-a860-58ae-bd70-f636dab2fc0e",
			icon_name: "icon12"
		},
		{
			icon_id: "72554f57-fec7-5d12-a24f-fc38b9e02c22",
			icon_name: "icon13"
		},
		{
			icon_id: "379fcde3-3d1d-528c-b687-f7059e0d5f9f",
			icon_name: "icon14"
		},
		{
			icon_id: "c4e47463-ecab-5d6c-a56a-cf2ff56d1626",
			icon_name: "icon15"
		},
		{
			icon_id: "8f46cd72-f986-5e7e-bbc5-d8d58a8dd26b",
			icon_name: "icon16"
		},
		{
			icon_id: "95b865f7-8d7a-530e-b4dc-0f15879c4cb6",
			icon_name: "icon17"
		},
		{
			icon_id: "a2c67584-891d-58cd-9728-5251e34f9cdf",
			icon_name: "icon18"
		},
		{
			icon_id: "5b8fdb2a-cf77-5bd9-8391-8d906cd412f6",
			icon_name: "icon19"
		},
		{
			icon_id: "8eb316c7-81e4-595d-b320-e1d25275b69f",
			icon_name: "icon20"
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
	},
	"ADD_TASK": function (taskData) {
		state.tasks.push({...taskData, "task_id": generateUUID()});
		setData('tasks', state.tasks);
	}
};

export {
	state,
	actions
};
