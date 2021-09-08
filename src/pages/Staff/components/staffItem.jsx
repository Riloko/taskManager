import {Avatar, Button, Card, Col, Row, Modal, Input} from "antd";
import {actions} from "../../../developHelpers/BD";
import {useState} from "react";


const StaffItem = ({ staff_id, staff_name, staff_skills, staff_avatar, config: { translateFields, fields }, updateStaff }) => {

	const [visible, setVisible] = useState(false);
	const [state, setState] = useState('remove');
	const data = {staff_name, staff_skills, staff_avatar};

	const onInputChange = (field, event) => {
		data[field] = event.target.value;
	};

	const updateUser = id => {
		actions.UPDATE_STAFF(id, data);
		updateStaff();
		setVisible(false);
	};

	const removeUser = id => {
		if (!id) return console.error('Не указан id', id);
		actions.REMOVE_STAFF(id);
		updateStaff();
		setVisible(false);
	};

	return (
		<Col span={8}>
			<Card style={{ width: 300, marginBottom: 15 }}>
				<Row align="center" style={{ marginBottom: 15 }}>
					<Col span={8}>
						<Avatar
							src={staff_avatar}
						/>
					</Col>
					<Col span={16} style={{display: 'flex', alignItems: 'center'}}>
						{staff_name}
					</Col>
				</Row>
				<Row style={{ marginBottom: 15 }}>
					<Col span={24}>{staff_skills}</Col>
					{staff_id}
				</Row>
				<Row>
					<Col span={13}>
						<Button onClick={() => { setState('edit'); setVisible(true); }} type="primary">Редактировать</Button>
					</Col>
					<Col span={11}>
						<Button onClick={() => { setState('remove'); setVisible(true); }} danger>Удалить</Button>
					</Col>
				</Row>
			</Card>
			<Modal
				title={ state === 'remove' ? 'Удалить пользователя?' : 'Обновить данные пользователя' }
				visible={visible}
				onOk={ state === 'remove' ? () => removeUser(staff_id) : () => updateUser(staff_id)}
				onCancel={() => setVisible(false)}
				okText={ state === 'remove' ? 'Удалить' : 'Редактировать' }
				cancelText="Отменить"
			>
				{
					state === 'remove' ? <div>Удалить пользователя <b>{staff_name}</b>?</div> : (
						fields.map(field => {
							return (
								<Row key={field} style={{marginBottom: 10}}>
									<Col span={24}>
										<div><b>{translateFields[field]}</b></div>
										<Input
											defaultValue={data[field]}
											onChange={ (event) => onInputChange(field, event) }
										/>
									</Col>
								</Row>
							)
						})
					)
				}
			</Modal>
		</Col>
	)
};

export default StaffItem;
