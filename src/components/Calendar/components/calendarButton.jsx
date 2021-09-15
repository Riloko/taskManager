import classNames from 'classnames';

import {
    calendar_body_button,
    calendar_body_button_today,
    calendar_body_button_lastMonth,
    calendar_body_button_nextMonth,
    calendar_body_button_isWeekend,
    calendar_body_button__inner,
    calendar_body_button__inner_header,
} from '../calendar.module.scss';

const CalendarButton = ({ day: { data, today, isWeekend, isPrevMonth, isNextMonth } }) => {
    const onClick = () => {
        console.log({ data, today, isWeekend, isPrevMonth, isNextMonth })
    }

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
            </div>
        </div>
    )
}


export default CalendarButton;
