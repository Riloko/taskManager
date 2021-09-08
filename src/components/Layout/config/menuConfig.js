import {
    UserOutlined,
    ScheduleOutlined
} from '@ant-design/icons';


import { STAFF, TASKS } from '../../../configs/routerConfig';


const MenuConfig = [
    {
        Icon: UserOutlined,
        label: 'Сотрудники',
        link: STAFF,
        key: 'staff'
    },
    {
        Icon: ScheduleOutlined,
        label: 'Мои задачи',
        link: TASKS,
        key: 'tasks'
    }
];


export default MenuConfig;
