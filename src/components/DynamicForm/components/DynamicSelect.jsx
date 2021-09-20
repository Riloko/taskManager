import {Select} from "antd";
import classNames from "classnames";
import {useState} from 'react';

import {state} from "../../../developHelpers/BD";

import * as icons from '../../../static/icons.js';

import {
  component_select,
  component_select_label,
  component_select_active,
  component_select_error,
  component_select_inner,
  component_input_inner_errorMessage,
} from './dynamicComponents.module.scss';

const {Option} = Select;

const DynamicSelect = ({ onCleanError, onInputChange = () => {}, name, type = 'string', required = false, label, width = '100%', error, entity }) => {

  const [active, setActive] = useState(false);
  const [value, setValue] = useState(undefined);
  const [errorMessage] = useState('Это поле обязательно к заполению!');

  const onSelectChange = value => {
    onInputChange(value, name);
    setActive(false);
    setValue(value);
    error && onCleanError(name);
  }

  return (
    <div
      className={classNames([{
        [component_select]: true,
        [component_select_active]: active,
        [component_select_error]: error
      }])}
      style={{width}}
    >
      <div className={component_select_label}>{label} {required && "*"}</div>
      <div>
        <Select
          className={classNames({
            [component_select_inner]: true,
            'error': error
          })}
          value={value}
          onChange={onSelectChange}
          onFocus={() => setActive(true)}
          onBlur={() => setActive(false)}
          allowClear
        >
          {state[entity] && state[entity].length ? state[entity].map(item => {
            return (
              <Option
                value={item[`${entity}_id`]}
                key={item[`${entity}_id`]}
              >
                {item[`${entity}_name`]}
                {entity === 'icon' && <img width={20} height={20} src={icons[item[`${entity}_name`]]} />}
                {entity === 'color' && <div style={{width: "30%", height: 10, display: 'inline-block', background: item[`${entity}_name`]}}></div>}
              </Option>
            )
          }) : null}
        </Select>
        { error && <p className={component_input_inner_errorMessage}>{errorMessage}</p> }
      </div>
    </div>
  )
};

export default DynamicSelect;
