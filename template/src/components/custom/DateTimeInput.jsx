import React from "react";
import { TextField, useInput } from "react-admin";
import { DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";

const DateTimeInput = (props) => {
  const { options, source, label, resource, className } = props;

  const providerOptions = {
    utils: DateFnsUtils,
    locale: ruLocale,
  };

  const {
    input: { name, onChange, value },
    meta: { touched, error },
  } = useInput(props);

  return (
    <MuiPickersUtilsProvider {...providerOptions}>
      <DateTimePicker
        {...options}
        name={name}
        label={<TextField source={source} label={label} resource={resource} />}
        margin="normal"
        error={!!(touched && error)}
        helperText={touched && error}
        className={className}
        value={value || ""}
        onChange={(date) => onChange(date)}
      />
    </MuiPickersUtilsProvider>
  );
};

export default DateTimeInput;
