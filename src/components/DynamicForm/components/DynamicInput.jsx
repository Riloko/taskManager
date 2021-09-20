import {useState} from 'react';
import classNames from "classnames";
import {CloseCircleOutlined} from "@ant-design/icons";

import {
  component_input,
  component_input_remover,
  component_input_active,
  component_input_error,
  component_input_label,
  component_input_inner,
  component_input_inner_errorMessage
} from './dynamicComponents.module.scss';


const DynamicInput = ({ onCleanError, onInputChange = () => {}, name, type = 'string', required = false, label, width = '100%', error, fieldType = 'text' }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [errorMessage] = useState('Это поле обязательно к заполению!');

  const onInput = value => {
    const regExp = /[\D\s]/gm;

    if (type === 'int') {
      setValue(value.replace(regExp, ''));
      onInputChange(value.replace(regExp, ''), name);
      return
    }
    setValue(value);
    onInputChange(value, name);
    error && onCleanError(name);
  };

  return (
    <div className={classNames([{
      [component_input]: true,
      [component_input_active]: active,
      [component_input_error]: error
    }])}
      style={{width}}
    >
      <div className={component_input_label}>
        {label} {required && "*"}
      </div>
      <div className={component_input_inner}>
        { fieldType === 'textarea'
          ? (
            <textarea
              value={value}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              onInput={event => onInput(event.target.value)}
              type={fieldType}
            />
          )
          : (
            <input
              value={value}
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              onInput={event => onInput(event.target.value)}
              type={fieldType}
              placeholder={label}
            />
          )
        }
        { error && <p className={component_input_inner_errorMessage}>{errorMessage}</p>}
        {
          value &&  <span onClick={() => onInput('')} className={component_input_remover}><CloseCircleOutlined /></span>
        }
      </div>
    </div>
  )
}

export default DynamicInput;
