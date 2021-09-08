import {Row, Col, Button, Input, Modal} from 'antd';
import {useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";

import {state, actions} from "../../developHelpers/BD";

import { StaffItem } from './components';

const Staff = () => {

    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    let userData = {};
    const translateFields = {
        staff_name: 'Имя пользователя',
        staff_skills: 'Навыки',
        staff_avatar: 'Ссылка на фото'
    };
    const fields = ['staff_name', 'staff_skills', 'staff_avatar'];
    const [staff, setStaff] = useState(state.staff);

    const onInputChange = (key, event) => {
        userData[key] = event.target.value;
    };

    const addUser = () => {
        actions.ADD_STAFF(userData);
        userData = {};
        setVisible(false);

    };


    return (
        <div>
            <Row style={{paddingBottom: 15}}>
                <Col>
                    <Button onClick={() => setVisible(true)} icon={<PlusCircleOutlined />}>Добавить нового сотрудника</Button>
                </Col>
            </Row>
            <Row>
                {
                    staff.map(({ staff_id, staff_name, staff_skills, staff_avatar }) =>
                        <StaffItem
                            key={staff_id}
                            staff_id={staff_id}
                            staff_name={staff_name}
                            staff_skills={staff_skills}
                            staff_avatar={staff_avatar}
                            config={ {translateFields, fields} }
                            updateStaff={ () => setStaff(state.staff)}
                        />)
                }
            </Row>
            <Modal
                title="Добавление пользователя"
                visible={visible}
                onOk={ () => addUser() }
                onCancel={() => {userData = {}; setVisible(false);}}
                okText="Добавить"
                cancelText="Отменить"
                destroyOnClose
            >
                {
                    fields.map(field => {
                        return (
                            <Row key={field} style={{marginBottom: 10}}>
                                <Col span={24}>
                                    <div><b>{translateFields[field]}</b></div>
                                    <Input
                                        defaultValue={userData[field]}
                                        onChange={ (event) => onInputChange(field, event) }
                                    />
                                </Col>
                            </Row>
                        )
                    })
                }
            </Modal>
        </div>
    );
};

export default Staff;
