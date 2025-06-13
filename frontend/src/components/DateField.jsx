import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styling/components/dateField.scss";

function DateField({selectedDate, setSelectedDate, title }) {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="field-input">
      <label>{ title == null ? "Month/Year" : title }</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        showFullMonthYearPicker
        placeholderText="Select month and year"
        className="date-input"
      />
    </div>
  );
}

export default DateField;
