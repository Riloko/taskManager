import {Button, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import React, {useState} from 'react';

import DynamicForm from "../../../components/DynamicForm";
import TaskItem from "./TaskItem";
import TypeItem from "./TypeItem";

import inputs from '../configs/inputs.json';
import typesCreateConfig from '../configs/typesCreateConfig.json';

import {actions, state, getters} from "../../../developHelpers/BD";

import {
	tasks_dashboard_body,
	tasks_dashboard_header,
	tasks_dashboard_header_text,
	tasks_dashboard_header_buttons
} from '../tasks.module.scss';

const tasksLayout = {
	"sendButton": {
		"text": "Создать дело",
		"primary": true
	},
	"cancelButton": {
		"text": "Отмена",
		"primary": false
	},
	"title": {
		"text": "Создать новое дело"
	}
};

const typesLayout = {
	"sendButton": {
		"text": "Создать раздел",
		"primary": true
	},
	"cancelButton": {
		"text": "Отмена",
		"primary": false
	},
	"title": {
		"text": "Создать новый раздел"
	}
};

const TasksDashboard = ({ dateRange, currentMonth }) => {

	const [entity, setEntity] = useState('tasks');
	const [currentType, setCurrentType] = useState(state['types'].length ? state['types'][0].types_id : '');
	const [active, setActive] = useState(false);
	const [key, setKey] = useState(1361234);
	const [config, setConfig] = useState([]);
	const [formLayoutConfig, setFormLayoutConfig] = useState({});

	const changeTasks = key => {
		setCurrentType(key)
	}

	const sendHandle = (data) => {
		if (entity === 'tasks') actions.ADD_TASK(data);
		if (entity === 'types') actions.ADD_TYPE(data);
	}

	const toggleModal = (val, config, formConfig, entity) => {
		setEntity(entity);
		setFormLayoutConfig(formConfig);
		setConfig(config);
		setActive(val);
		!val && setKey(key + 1);
	}

	const changeType = type => {
		setCurrentType(type)
	}

	return (
		<React.Fragment>
			<div className={tasks_dashboard_header}>
				<p className={tasks_dashboard_header_text}>
					{currentMonth ? currentMonth.format('MMMM YYYY') : ''}
					<div>
						<Button style={{marginRight: 5}} onClick={() => toggleModal(true, typesCreateConfig, typesLayout, 'types')} icon={<PlusOutlined />} type="primary" danger>Раздел</Button>
						<Button onClick={() => toggleModal(true, inputs, tasksLayout, 'tasks')} icon={<PlusOutlined />} type="primary" title="Создать новое дело">Дело</Button>
					</div>

				</p>
				<div className={tasks_dashboard_header_buttons}>
					{
						getters.GET_TYPES().map(type => <TypeItem typeData={type} activeType={currentType} changeType={changeType} key={type.types_id}/>)
					}
					{/**/}
				</div>
			</div>
			<div className={tasks_dashboard_body}>
				{
					getters.GET_TASKS(currentType, dateRange).map(task => <TaskItem taskData={task} key={task.task_id}/>)
				}
			</div>
			<Modal
				footer={null}
				visible={active}
				onCancel={() => toggleModal(false)}
				maskClosable={false}
				closable={false}
			>
				<div style={{width: '100%', height: "500px"}}>
					<DynamicForm config={config} formConfig={formLayoutConfig} modalToggleFunction={toggleModal} key={key} actionHandler={sendHandle} />
				</div>
			</Modal>
		</React.Fragment>
	)
}



export default TasksDashboard;
