import {useState} from 'react';
import classNames from "classnames";

import {
  component_input,
  component_input_active,
  component_input_error,
  component_input_label,
  component_input_inner,
  component_input_inner_errorMessage
} from './dynamicComponents.module.scss';

const DynamicInput = ({ onInputChange = () => {}, name, type = 'string', required = false, label, width = '100%' }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(' ');

  const onInput = event => {
    const {value} = event.target;
    const regExp = /[\D\s]/gm;

    if (type === 'int') {
      setValue(value.replace(regExp, ''));
      onInputChange(value.replace(regExp, ''));
      return
    }
    setValue(value);
    onInputChange(value);
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
        <input
          value={value}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          onInput={onInput}
        />
        { errorMessage && <p className={component_input_inner_errorMessage}>{errorMessage}</p>}
      </div>
    </div>
  )
}

export default DynamicInput;
