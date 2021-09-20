import {useState} from "react";

import Calendar from "../../components/Calendar";
import { TasksDashboard } from "./components";

import {tasks, tasks_calendar, tasks_dashboard} from './tasks.module.scss';

const Tasks = () => {

    const [currentEventsRange, setCurrentEventRange] = useState(null)
    const [currentMonth, setCurrentMonth] = useState(null)

    const getCurrentDate = range => {
        setCurrentEventRange(range);
    }

    const getCurrentMonth = month => {
        setCurrentMonth(month);
    }

    return (
       <div className={tasks}>
           <div className={tasks_calendar}>
               <Calendar getDate={getCurrentDate} getMonth={getCurrentMonth}/>
           </div>
           <div className={tasks_dashboard}>
               <TasksDashboard dateRange={currentEventsRange} currentMonth={currentMonth}/>
           </div>
       </div>
    )
}

export default Tasks;
