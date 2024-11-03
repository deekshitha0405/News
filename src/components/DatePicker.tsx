import React, { useEffect } from "react";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DatePickerComp = ({ handleChange }: any) => {
  const [value, setValue] = React.useState<Dayjs | any>(undefined);

  useEffect(() => {
    if(value!=undefined)
    handleChange(dayjs(value)?.format("YYYY-MM-DD"));
  }, [value]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Result by Date"
        value={value}
        onChange={(newValue: Dayjs | null) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComp;
