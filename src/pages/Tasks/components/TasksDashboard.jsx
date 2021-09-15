import { Tabs } from "antd";
import tabConfig from '../configs/tabConfig.json';

const { TabPane } = Tabs;


const TasksDashboard = () => {

	const callback = key => {
		console.log(key)
	}

	return (
		<div>
			<div>
				<Tabs defaultActiveKey="work" onChange={callback}>
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
		</div>
	)
}



export default TasksDashboard;
