import moment from "moment";

import {
	tasks_item,
	tasks_item_header,
	tasks_item_header_title,
	tasks_item_header_deadline,
	tasks_item_body,
	tasks_item_body_description,
	tasks_item_body_data,
	tasks_item_body_data_staff,
	tasks_item_body_data_staff_avatar,
	tasks_item_body_data_staff_info,
	tasks_item_body_data_staff_info_name,
	tasks_item_body_data_staff_info_skills,
	tasks_item_body_data_myPrediction,
	tasks_item_footer,
	tasks_item_footer_type,
	tasks_item_footer_type_icon,
	tasks_item_footer_type_name,
	tasks_item_footer_state,
} from '../tasks.module.scss';

import * as icons from '../../../static/icons';

const TaskItem = ({ taskData }) => {
	return (
		<div
			className={tasks_item}
		>
			<div className={tasks_item_header}>
				<div className={tasks_item_header_title}>{taskData.task_title}</div>
				<div className={tasks_item_header_deadline}>{taskData.task_deadline ? `${moment(taskData.task_deadline).format('DD.MM.YYYY')}` : "Не распределено"}</div>
			</div>
			<div className={tasks_item_body}>
				<div className={tasks_item_body_description}>{taskData.task_description}</div>
				<div className={tasks_item_body_data}>
					<div className={tasks_item_body_data_staff}>
						<div className={tasks_item_body_data_staff_avatar}>
							<img src={taskData.task_staff.staff_avatar} alt={taskData.task_staff.staff_name} />
						</div>
						<div className={tasks_item_body_data_staff_info}>
							<div className={tasks_item_body_data_staff_info_name}>{taskData.task_staff.staff_name}</div>
							<div className={tasks_item_body_data_staff_info_skills}>{taskData.task_staff.staff_skills}</div>
						</div>
					</div>
					{ taskData.task_my_prediction ? <div className={tasks_item_body_data_myPrediction}>Оценка: {taskData.task_my_prediction} ч.</div> : null }
				</div>
			</div>
			<div className={tasks_item_footer}>
				<div className={tasks_item_footer_type} style={{background: taskData.task_type.types_color.color_name}}>
					<img className={tasks_item_footer_type_icon} src={icons[taskData.task_type.types_icon.icon_name]} alt={taskData.task_state.state_name} />
					<div className={tasks_item_footer_type_name}>{taskData.task_type.types_name}</div>
				</div>
				<div className={tasks_item_footer_state}>{taskData.task_state.state_name}</div>
			</div>
		</div>
	)
}


export default TaskItem;
