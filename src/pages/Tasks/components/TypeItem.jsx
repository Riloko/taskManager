import classNames from "classnames";

import {tasks_dashboard_header_buttons_button} from '../tasks.module.scss';


const TypeItem = ({ typeData, changeType, activeType }) => {
	const onChange = type => {
		changeType(type);
	}

	return (
		<div
			className={classNames({
				[tasks_dashboard_header_buttons_button]: true,
			})}
			onClick={() => onChange(typeData.types_id)}
			style={{background: activeType === typeData.types_id ? typeData.types_color.color_name : 'rgba(102, 102, 102, 0.5)'}}
		>
			{typeData.types_name}
		</div>
	)
}


export default TypeItem;
