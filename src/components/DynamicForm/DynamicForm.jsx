import React, {useState, useEffect} from 'react';
import {Button} from "antd";

import {actions} from "../../developHelpers/BD";

import {
  DynamicInput,
  DynamicSelect,
  DynamicDatepicker
} from "./components";

import {
  form,
  form_header,
  form_body,
  form_footer
} from './dynamicForm.module.scss';

const DynamicForm = ({ config, formConfig: {sendButton, cancelButton, title} = {} , modalToggleFunction}) => {

  const DynamicComponents = {
    input: (name, required, type, label, width, error, fieldType) => <DynamicInput onCleanError={removeError} { ...{ name, required, type, onInputChange, label, width, error, fieldType } } key={name} />,
    select: (name, required, type, label, width, error, _, entity) => <DynamicSelect onCleanError={removeError} { ...{ name, required, type, onInputChange, label, width, error, entity } } key={name} />,
    textarea: (name, required, type, label, width, error) => <DynamicInput onCleanError={removeError} { ...{ name, required, type, onInputChange, label, width, error, fieldType: 'textarea' } } key={name} />,
    datepicker: (name, required, type, label, width, error) => <DynamicDatepicker onCleanError={removeError} { ...{ name, required, type, onInputChange, label, width, error } } key={name} />
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
      if (!valid) return;

      actions.ADD_TASK(data);
      modalToggleFunction && modalToggleFunction(false);
  };

  const onPrimaryClick = () => {
    sendTestForm();
  }

  const onSecondaryClick = () => {
    modalToggleFunction && modalToggleFunction(false);

    let clearObj = {};
    Object.keys(data).map(key => clearObj[key] = "");
    setData(clearObj);
  }

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
            ? config.map(({component, name, required, type, label, width, fieldType, entity}) => {
              if (DynamicComponents[component]) {
                return DynamicComponents[component](name, required, type, label, width, errorData[name], fieldType, entity)
              }
            })
            : <div>Нет полей для отображения!</div>
        }
      </div>
      <div className={form_footer}>
          {sendButton && <Button onClick={onPrimaryClick} type={sendButton.primary ? 'primary' : 'secondary'}>{sendButton.text}</Button>}
          {cancelButton && <Button onClick={onSecondaryClick} type={cancelButton.primary ? 'primary' : 'secondary'}>{cancelButton.text}</Button>}
      </div>
    </div>
  )
}


export default DynamicForm;
