import {useState, useEffect} from "react";
import moment from "moment";

import Calendar from "../../components/Calendar";


const Tasks = () => {

    const [currentEventsRange, setCurrentEventRange] = useState(null)

    const getCurrentDate = date => {
        const startDay = date.clone().set('date', 1);
        const lastDay = date.clone().set('date', 1).add(1, 'month').subtract(1, 'days');

        setCurrentEventRange({ startDay, lastDay });
    }

    useEffect(() => {
        getCurrentDate(moment());
    }, [])

    return (
       <div>
           <Calendar getDate={getCurrentDate}/>
       </div>
    )
}

export default Tasks;
