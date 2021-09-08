const UUID = '[0-9a-fA-F]{8}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{4}\\-[0-9a-fA-F]{12}';
const DASHBOARD = '/dashboard';
const TASKS = '/tasks';
const STAFF = '/staff';


const CURRENT_TASK = `${TASKS}/:id(${UUID})?`;





export {
    DASHBOARD,
    TASKS,
    STAFF,
    CURRENT_TASK
};