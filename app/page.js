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
    // 獲取當前月份的起始日和結束日
    const monthStart = startOfMonth(currentMonth);
    console.log("monthStart", monthStart);
    //Aug 01
    const monthEnd = endOfMonth(monthStart);
    // 獲取包含整個月的完整週的起始日和結束日
    const startDay = startOfWeek(monthStart);
    //Jul 28
    console.log("startDay", startDay);
    const endDay = endOfWeek(monthEnd);

    const dateFormat = "d"; // 設置日期格式為日期數字
    const rows = []; // 用於存儲每週的行
    let days = []; // 用於存儲每週的日期
    let day = startDay; // 從週的第一天開始
    let formattedDate = "";

    // 遍歷從startDay到endDay的所有日期
    while (day <= endDay) {
      for (let i = 0; i < 7; i++) {
        // 每週7天
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        // 檢查特殊日期狀態
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
        console.log("startDay", startDay);
        // 創建日期元素並添加到days數組
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
        console.log("days", days);

        day = addDays(day, 1); // 移至下一天
      }
      // 將一週的日期添加到行中

      rows.push(
        <div className="flex" key={day}>
          {days}
        </div>
      );

      //console.log("rows", rows);

      days = []; // 重置days數組，準備下一週
    }
    console.log("rows", rows);
    return rows;
  };

  const renderHeader = () => {
    const dateFormat = "yyyy年M月";
    return (
      <div className="flex justify-between items-center mb-4 h-11">
        <ChevronLeft
          data-testid="left-arrow"
          className="cursor-pointer p-1  transition-colors duration-200 ease-in-out hover:bg-[#e6e6e6] w-11 h-11"
          onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        />
        <span>{format(currentMonth, dateFormat)}</span>
        <ChevronRight
          data-testid="right-arrow"
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
