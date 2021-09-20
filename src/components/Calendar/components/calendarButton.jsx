import classNames from 'classnames';
import {useEffect, useState} from 'react';

import {
    calendar_body_button,
    calendar_body_button_today,
    calendar_body_button_lastMonth,
    calendar_body_button_nextMonth,
    calendar_body_button_isWeekend,
    calendar_body_button__inner,
    calendar_body_button__inner_header,
    calendar_body_button__inner_body,
    calendar_body_button__inner_body_icons,
    calendar_body_button__inner_body_icons_icon,
} from '../calendar.module.scss';

import * as icons from '../../../static/icons';

const CalendarButton = ({ day: { data, today, isWeekend, isPrevMonth, isNextMonth, taskData } }) => {
    const [types, setTypes] = useState({});

    const onClick = () => {

        console.log({ data, today, isWeekend, isPrevMonth, isNextMonth, taskData })
        console.log(types)
    }

    useEffect(() => {
      const data = {};
      taskData.map(({task_type}) => data[task_type.types_id] = task_type)

      setTypes(data);
    }, [])

    return (
        <div
        onClick={onClick}
        className={classNames ({
            [calendar_body_button]: true,
            [calendar_body_button_today]: today,
            [calendar_body_button_isWeekend]: isWeekend,
            [calendar_body_button_lastMonth]: isPrevMonth,
            [calendar_body_button_nextMonth]: isNextMonth
        })}
        >
            <div className={calendar_body_button__inner}>
                <div className={calendar_body_button__inner_header}>
                    <span>{data ? data.get('date') : ""}</span>
                </div>
              <div className={calendar_body_button__inner_body}>
                <div className={calendar_body_button__inner_body_icons}>
                  { types && Object.keys(types).map(type => {
                    return (
                      <div
                        className={calendar_body_button__inner_body_icons_icon}
                        style={{ background: types[type].types_color.color_name }}
                        key={type}
                      >
                        <img src={icons[types[type].types_icon.icon_name]} alt={types[type].types_name}/>
                        {types[type].types_name}
                      </div>
                    )
                  }) }
                </div>
              </div>
            </div>
        </div>
    )
}


export default CalendarButton;
