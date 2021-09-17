import {Tabs, Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from 'react';

import DynamicForm from "../../../components/DynamicForm";

import tabConfig from '../configs/tabConfig.json';
import inputs from '../configs/inputs.json';

import { tasks_dashboard_header } from '../tasks.module.scss';

const { TabPane } = Tabs;


const TasksDashboard = ({ dateRange }) => {

	const [currentType, setCurrentType] = useState('work');

	const changeTasks = key => {
		setCurrentType(key)
	}

	return (
		<React.Fragment>
			<div className={tasks_dashboard_header}>
				<Button icon={<PlusCircleOutlined />} type="primary" danger>Добавить новое дело</Button>
				<div style={{width: '100%', height: "500px", border: "1px solid #000"}}>
					<DynamicForm config={inputs}/>
				</div>
			</div>
			<div>
				<Tabs defaultActiveKey={currentType} onChange={changeTasks}>
					{
						tabConfig.map(({name, type}) => {
							return (
								<TabPane tab={name} key={type}>
									{name}: {type}
								</TabPane>
							)
						})
					}
				</Tabs>
			</div>
		</React.Fragment>
	)
}



export default TasksDashboard;
