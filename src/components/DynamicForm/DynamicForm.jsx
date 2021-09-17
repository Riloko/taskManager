import React, {useState} from 'react';

import {
  DynamicInput
} from "./components";

import {
  form,
  form_header,
  form_body,
  form_footer
} from './dynamicForm.module.scss';

const DynamicForm = ({ config }) => {
  const DynamicComponents = {
    input: (name, required, type, label, width) => <DynamicInput onInputChange={value => onInputChange(value, name)} key={name} name={name} required={required} type={type} label={label} width={width}/>
  };
  const [data, setData] = useState({});
  const onInputChange = (value, name) => {
    setData({...data, [name]: value});
    // data[name] = value;
  };

  return (
    <div className={form}>
      <div className={form_header}>Заголовок</div>
      <div className={form_body}>
        {
          config && config.length
            ? config.map(({component, name, required, type, label, width}) => {
              if (component === 'input') {
                return DynamicComponents[component](name, required, type, label, width)
              }
            })
            : <div>Нет полей для отображения!</div>
        }
      </div>
      <div className={form_footer}>Подвал</div>
    </div>
  )
}


export default DynamicForm;
