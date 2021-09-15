import {
    UserOutlined,
    ScheduleOutlined
} from '@ant-design/icons';


import { STAFF, TASKS } from '../../../configs/routerConfig';


const MenuConfig = [
    {
        Icon: ScheduleOutlined,
        label: 'Мои задачи',
        link: TASKS,
        key: 'tasks'
    },
    {
        Icon: UserOutlined,
        label: 'Сотрудники',
        link: STAFF,
        key: 'staff'
    }
];


export default MenuConfig;
