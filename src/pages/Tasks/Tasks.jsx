import {useState} from "react";

import Calendar from "../../components/Calendar";
import { TasksDashboard } from "./components";

import {tasks, tasks_calendar, tasks_dashboard} from './tasks.module.scss';

const Tasks = () => {

    const [currentEventsRange, setCurrentEventRange] = useState(null)

    const getCurrentDate = range => {
        setCurrentEventRange(range);
    }

    return (
       <div className={tasks}>
           <div className={tasks_calendar}>
               <Calendar getDate={getCurrentDate}/>
           </div>
           <div className={tasks_dashboard}>
               <TasksDashboard dateRange={currentEventsRange}/>
           </div>
       </div>
    )
}

export default Tasks;
