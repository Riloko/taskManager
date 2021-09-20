import moment from "moment";
import { useEffect, useState } from "react";
import { Button } from 'antd';

import { getters } from "../../developHelpers/BD";

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import CalendarButton from "./components/calendarButton";

import {
    calendar,
    calendar_body,
    calendar_body_table,
    calendar_body_table_row,
    calendar_body_daysOfWeek,
    calendar_body_daysOfWeek_item,
    calendar_header,
    calendar_header_controls
} from './calendar.module.scss';

const Calendar = ({ getDate, getMonth }) => {
    const [currentDate, setCurrentDate] = useState(moment().set('date', 1));
    const [daysOfMonth, setDaysOfMonth] = useState(null);
    const [daysOfTheWeek] = useState(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']);

    const uuid = () => {
        return (
            Math.random()
                .toString(36)
                .substring(2, 15) +
            Math.random()
                .toString(36)
                .substring(2, 15)
        );
    };

    const getCalendarMatrix = date => {

        let calendarMatrix = [];

        const currDate = date.clone().set('date', 1);


        let startDay = date.clone().set('date', 1);
        let lastDay = date.clone().set('date', 1).add(1, 'month').subtract(1, 'days');

        getMonth(currDate);

        // Модифицируем результат getDay так, чтобы понедельник был = 0 вместо воскресенья = 0
        let startDow = (startDay.day() + 6) % 7;
        let endDow = (lastDay.day() + 6) % 7;

        // Если месяц не начался в понедельник, начнем с последнего понедельника предыдущего месяца
        startDay.set('date', startDay.get('date') - startDow);

        // Если месяц не заканчивался в воскресенье, конец - следующее воскресенье следующего месяца
        lastDay.set('date', lastDay.get('date') + (6 - endDow));

        getDate({ lastDay: lastDay.clone(), startDay: startDay.clone() });
        const taskData = getters.GET_TASKS(null, { lastDay: lastDay.clone(), startDay: startDay.clone() });

        while (startDay <= lastDay) {
            calendarMatrix.push({
                uuid: uuid(),
                data: moment(startDay),
                taskData: taskData.filter(({ task_deadline }) => moment(task_deadline).isSame(startDay, 'day')),
                today: moment().isSame(startDay, 'day'),
                isWeekend: moment(startDay).day() === 6 || moment(startDay).day() === 0,
                isPrevMonth: moment(date).set('month', date.get('month') - 1).get('month') === moment(startDay).get('month'),
                isNextMonth: moment(date).set('month', date.get('month') + 1).get('month') === moment(startDay).get('month')
            });
            startDay.set('date',startDay.get('date') + 1);
        }

        return calendarMatrix;
    }

    const nextMonth = () => {
        const newDate = moment(currentDate).set('month', currentDate.get('month') + 1);
        changeMonth(newDate);
    };

    const prevMonth = () => {
        const newDate = moment(currentDate).set('month', currentDate.get('month') - 1);
        changeMonth(newDate);
    };

    const changeMonth = newDate => {
        setCurrentDate(newDate);
        setDaysOfMonth(getCalendarMatrix(newDate))
    };

    const renderCalendar = () => {
        if (!daysOfMonth) return []
        let result = [];

        for (let i = 0; i < 5; i++) {
            let row = [];
            for (let j = 0; j < 7; j++) {
                row.push(Array.from(daysOfMonth).slice(7 * i, 7 * (i + 1))[j])
            }
            result.push(row);
        }

        return result;
    }

    useEffect(() => {
        setDaysOfMonth(getCalendarMatrix(currentDate));
    }, [currentDate])

    return (
        <div className={calendar}>
            <div className={calendar_header}>
                <div className={calendar_header_controls}>
                    <Button onClick={prevMonth} icon={<LeftOutlined />}></Button>
                    <Button onClick={nextMonth} icon={<RightOutlined />}></Button>
                </div>
            </div>
            <div className={calendar_body}>
                <div className={calendar_body_daysOfWeek}>
                    { daysOfTheWeek.map(day => <div className={calendar_body_daysOfWeek_item} key={day}>{day}</div>) }
                </div>
                <div className={calendar_body_table}>
                    {
                        renderCalendar().map((row, index) => {
                            return (
                                <div className={calendar_body_table_row} key={index}>
                                    {
                                        row.map(day => <CalendarButton key={day.uuid} day={day} />)
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}


export default Calendar;
