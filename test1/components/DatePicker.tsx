// Copyright (c) 2022-present InstantApp Solutions. All Rights Reserved.
import React from "react";
import { IonDatetime } from "@ionic/react";
import { useFormikContext, useField } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.css";

interface DatePickerProps {
  name: string;
  id: string;
  label: string;
  presentation?: "date-time" | "date" | "time";
  min?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  name,
  id,
  label,
  presentation,
  min,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const generateTimeOptions = () => {
    const options = [];
    for (let i = 0; i < 60; i += 30) {
      options.push(i);
    }
    return options;
  };

  const handleChange = (e: CustomEvent) => {
    setFieldValue(field.name, e.detail.value);
  };

  return (
    <div className="date-picker">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <IonDatetime
        presentation={presentation || "date-time"}
        minuteValues={generateTimeOptions()}
        value={field.value}
        onIonChange={handleChange}
        className="input"
        min={min}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default DatePicker;
