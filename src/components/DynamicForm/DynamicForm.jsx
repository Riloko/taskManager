import React, {useState, useEffect} from 'react';
import {Button} from "antd";

import {
  DynamicInput
} from "./components";

import {
  form,
  form_header,
  form_body,
  form_footer
} from './dynamicForm.module.scss';

const DynamicForm = ({ config, formConfig: {sendButton, cancelButton, title} = {} }) => {

  const DynamicComponents = {
    input: (name, required, type, label, width, error) => <DynamicInput onCleanError={removeError} onInputChange={value => onInputChange(value, name)} key={name} name={name} required={required} type={type} label={label} width={width} error={error}/>
  };

  const [data, setData] = useState({});
  const [validateData, setValidateData] = useState({});
  const [errorData, setErrorData] = useState({})

  const onInputChange = (value, name) => {
    setData({...data, [name]: value});
  };

  const sendTestForm = () => {
      let valid = true;
      const errors = {};

      Object.keys(data).map(name => {
          errors[name] = false;
        if (validateData[name]) {
            if (!data[name] && !data[name].length) {
                valid = false;
                errors[name] = true;
            }
        }
      })

      setErrorData(errors);
  };

  const removeError = name => {
      setErrorData({...errorData, [name]: false});
  }

  useEffect(() => {
      const errors = {};
      const validate = {};
      const inputs = {};

      config.map(({ name, required }) => {
         errors[name] = false;
         validate[name] = required;
         inputs[name] = "";
      });

      setErrorData(errors);
      setValidateData(validate);
      setData(inputs);
  }, [])

  return (
    <div className={form}>
      <div className={form_header}>
          {title ? title.text : 'Заголовок'}
      </div>
      <div className={form_body}>
        {
          config && config.length
            ? config.map(({component, name, required, type, label, width}) => {
              if (component === 'input') {
                return DynamicComponents[component](name, required, type, label, width, errorData[name])
              }
            })
            : <div>Нет полей для отображения!</div>
        }
      </div>
      <div className={form_footer}>
          {sendButton && <Button onClick={sendTestForm} type={sendButton.primary ? 'primary' : 'secondary'}>{sendButton.text}</Button>}
          {cancelButton && <Button type={cancelButton.primary ? 'primary' : 'secondary'}>{cancelButton.text}</Button>}
      </div>
    </div>
  )
}


export default DynamicForm;
