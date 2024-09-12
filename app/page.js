"use client";
import React, { useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  addDays,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateRangePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const dayState = {
    default: "white",
    hover: "#e6e6e6",
    today: "#ffff76",
    active: "#006edc",
    nonCurrentMonth: "#757575",
  };

  const onDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (isSameDay(day, startDate) || isAfter(day, startDate)) {
      setEndDate(day);
    } else {
      setStartDate(day);
      setEndDate(null);
    }
  };

  const renderDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDay = startOfWeek(monthStart);
    const endDay = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDay;
    let formattedDate = "";

    while (day <= endDay) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected =
          (startDate && isSameDay(day, startDate)) ||
          (endDate && isSameDay(day, endDate));
        const isInRange =
          startDate &&
          endDate &&
          isAfter(day, startDate) &&
          isBefore(day, endDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        let backgroundColor = dayState.default;
        let textColor = isCurrentMonth ? "inherit" : dayState.nonCurrentMonth;
        if (isToday) backgroundColor = dayState.today;
        if (isSelected) backgroundColor = dayState.active;
        if (isInRange) backgroundColor = dayState.active;

        days.push(
          <div
            className={`w-[50px] flex items-center justify-center h-[36px]   text-base cursor-pointer transition-colors duration-200 ease-in-out hover:!bg-[#e6e6e6]`}
            style={{ backgroundColor, color: textColor }}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            {formattedDate}日
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return rows;
  };

  const renderHeader = () => {
    const dateFormat = "yyyy年M月";
    return (
      <div className="flex justify-between items-center mb-4 h-11">
        <ChevronLeft
          className="cursor-pointer p-1  transition-colors duration-200 ease-in-out hover:bg-[#e6e6e6] w-11 h-11"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        />
        <span>{format(currentMonth, dateFormat)}</span>
        <ChevronRight
          className="cursor-pointer p-1  transition-colors duration-200 ease-in-out hover:bg-[#e6e6e6] w-11 h-11"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-1 w-[358px] ">
        {renderHeader()}
        {renderDays()}
      </div>
    </div>
  );
};

export default DateRangePicker;
