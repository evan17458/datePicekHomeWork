"use client";
import React, { useState } from "react";
import {
  format,
  addMonths,
  startOfMonth,
  endOfMonth,
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

  // 日期狀態對象
  const dayState = {
    default: "white",
    hover: "#a6e6e6",
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
    const startDay = startOfMonth(monthStart);
    const endDay = endOfMonth(monthEnd);

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
        if (!isCurrentMonth) backgroundColor = dayState.nonCurrentMonth;
        if (isToday) backgroundColor = dayState.today;
        if (isSelected) backgroundColor = dayState.active;
        if (isInRange) backgroundColor = dayState.hover;

        days.push(
          <div
            className={`w-[50px] py-1 m-1 text-center cursor-pointer`}
            style={{ backgroundColor }}
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

  return (
    <div className="p-4 w-[350px]">
      <div className="flex justify-between items-center mb-4">
        <ChevronLeft
          className="cursor-pointer"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        />
        <span>{format(currentMonth, "yyyy年MM月")}</span>
        <ChevronRight
          className="cursor-pointer"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        />
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
          <div key={day} className="font-bold">
            {day}
          </div>
        ))}
      </div>

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
