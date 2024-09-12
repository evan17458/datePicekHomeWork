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
  getDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DateRangePicker = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // 日期狀態對象
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
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
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
        // if (isInRange) backgroundColor = dayState.active;

        days.push(
          <div
            className={`w-[50px] py-1 m-1 text-center cursor-pointer transition-colors duration-200 ease-in-out hover:!bg-[#e6e6e6]`}
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
      <div className="flex justify-between items-center mb-4">
        <ChevronLeft
          className="cursor-pointer"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        />
        <span>{format(currentMonth, dateFormat)}</span>
        <ChevronRight
          className="cursor-pointer"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const dateFormat = "EEEEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="font-bold">
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 text-center mb-2">{days}</div>
    );
  };

  return (
    <div className="p-4 w-[400px]">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDays()}
      <div className="mt-4">
        <p>
          開始日期: {startDate ? format(startDate, "yyyy-MM-dd") : "未選擇"}
        </p>
        <p>結束日期: {endDate ? format(endDate, "yyyy-MM-dd") : "未選擇"}</p>
      </div>
    </div>
  );
};

export default DateRangePicker;
