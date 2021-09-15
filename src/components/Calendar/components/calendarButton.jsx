import classNames from 'classnames';
import moment from 'moment';

import {
    calendar_body_button,
    calendar_body_button_today,
    calendar_body_button_lastMonth,
    calendar_body_button_nextMonth,
    calendar_body_button_isWeekend,
    calendar_body_button__inner,
} from '../calendar.module.scss';

const CalendarButton = ({ day: { data, today, isWeekend, isPrevMonth, isNextMonth } }) => {
    const onClick = () => {
        console.log({ data, today, isWeekend, isPrevMonth, isNextMonth })
    }

    return (
        <td
        onClick={onClick}
        className={classNames ({
            [calendar_body_button]: true,
            [calendar_body_button_today]: today,
            [calendar_body_button_isWeekend]: isWeekend,
            [calendar_body_button_lastMonth]: isPrevMonth,
            [calendar_body_button_nextMonth]: isNextMonth
        })}
        >
            <span
                className={calendar_body_button__inner}
            >
                {data ? data.get('date') : ""}
            </span>
        </td>
    )
}


export default CalendarButton;
