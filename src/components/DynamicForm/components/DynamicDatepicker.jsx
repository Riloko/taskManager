import {DatePicker} from "antd";
import {useState} from 'react';
import classNames from "classnames";

import {
  component_datepicker,
  component_datepicker_label,
  component_datepicker_active,
  component_datepicker_error,
  component_datepicker_inner,
  component_datepicker_inner_picker,
  component_input_inner_errorMessage
} from './dynamicComponents.module.scss';



const DynamicDatepicker = ({ onCleanError, onInputChange = () => {}, name, type = 'string', required = false, label, width = '100%', error }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [errorMessage] = useState('Это поле обязательно к заполению!');

  const onDatepickerChange = (date, dateFormat) => {
    setValue(date);
    onInputChange(date ? date._d : null, name);
    error && onCleanError(name);
  }

  return (
    <div
      className={classNames([{
        [component_datepicker]: true,
        [component_datepicker_active]: active,
        [component_datepicker_error]: error
      }])}
      style={{width}}
    >
      <div
        className={component_datepicker_label}
      >
        {label} {required && "*"}
      </div>
      <div className={component_datepicker_inner}>
        <DatePicker
          className={component_datepicker_inner_picker}
          onChange={onDatepickerChange}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          placeholder={label}
          format='DD.MM.YYYY'
        />
        { error && <p className={component_input_inner_errorMessage}>{errorMessage}</p> }
      </div>
    </div>
  )
}

export default DynamicDatepicker;
