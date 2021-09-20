import {Tabs, Button, Modal} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from 'react';

import DynamicForm from "../../../components/DynamicForm";

import inputs from '../configs/inputs.json';
import typesCreateConfig from '../configs/typesCreateConfig.json';

import {state} from "../../../developHelpers/BD";

import {
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

const TasksDashboard = ({ dateRange }) => {

	const [currentType, setCurrentType] = useState('Работа');
	const [active, setActive] = useState(false);
	const [key, setKey] = useState(1361234);
	const [config, setConfig] = useState([]);
	const [formLayoutConfig, setFormLayoutConfig] = useState({});

	const changeTasks = key => {
		setCurrentType(key)
	}

	const toggleModal = (val, config, formConfig) => {
		setFormLayoutConfig(formConfig);
		setConfig(config);
		setActive(val);
		!val && setKey(key + 1);
	}

	return (
		<React.Fragment>
			<div className={tasks_dashboard_header}>
				<p className={tasks_dashboard_header_text}>Дела мая</p>
				<div className={tasks_dashboard_header_buttons}>
					<Button onClick={() => toggleModal(true, inputs, tasksLayout)} icon={<PlusCircleOutlined />} type="primary" danger>Добавить новое дело</Button>
					<Button onClick={() => toggleModal(true, typesCreateConfig, typesLayout)} icon={<PlusCircleOutlined />} type="primary">Добавить раздел</Button>
				</div>
			</div>
			<div>

			</div>
			<Modal
				footer={null}
				visible={active}
				onCancel={() => toggleModal(false)}
				maskClosable={false}
				closable={false}
			>
				<div style={{width: '100%', height: "500px"}}>
					<DynamicForm config={config} formConfig={formLayoutConfig} modalToggleFunction={toggleModal} key={key} />
				</div>
			</Modal>
		</React.Fragment>
	)
}



export default TasksDashboard;
