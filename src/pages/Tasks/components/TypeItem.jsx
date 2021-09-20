import classNames from "classnames";

import * as icons from '../../../static/icons';

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
			<img src={icons[typeData.types_icon.icon_name]} alt={typeData.types_name}/>
			{typeData.types_name}
		</div>
	)
}


export default TypeItem;
