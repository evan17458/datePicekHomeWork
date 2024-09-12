import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DateRangePicker from "../app/page";
import { format } from "date-fns";

describe("DateRangePicker", () => {
  test("renders the current month and year", () => {
    render(<DateRangePicker />);
    const currentDate = format(new Date(), "yyyy年M月");
    expect(screen.getByText(currentDate)).toBeInTheDocument();
  });

  test("navigates to the previous month when left arrow is clicked", () => {
    render(<DateRangePicker />);
    const leftArrow = screen.getByTestId("left-arrow");
    fireEvent.click(leftArrow);
    const previousMonth = format(
      new Date(new Date().setMonth(new Date().getMonth() - 1)),
      "yyyy年M月"
    );
    expect(screen.getByText(previousMonth)).toBeInTheDocument();
  });

  test("navigates to the next month when right arrow is clicked", () => {
    render(<DateRangePicker />);
    const rightArrow = screen.getByTestId("right-arrow");
    fireEvent.click(rightArrow);
    const nextMonth = format(
      new Date(new Date().setMonth(new Date().getMonth() + 1)),
      "yyyy年M月"
    );
    expect(screen.getByText(nextMonth)).toBeInTheDocument();
  });

  test("selects start date when a date is clicked", () => {
    render(<DateRangePicker />);
    const dateCell = screen.getByText("15日");
    fireEvent.click(dateCell);
    expect(dateCell).toHaveStyle("background-color: #006edc");
  });

  test("selects end date when second date is clicked", () => {
    render(<DateRangePicker />);
    const startDate = screen.getByText("15日");
    const endDate = screen.getByText("20日");
    fireEvent.click(startDate);
    fireEvent.click(endDate);
    expect(startDate).toHaveStyle("background-color: #006edc");
    expect(endDate).toHaveStyle("background-color: #006edc");
  });

  test("highlights range between start and end date", () => {
    render(<DateRangePicker />);
    const startDate = screen.getByText("15日");
    const endDate = screen.getByText("20日");
    const middleDate = screen.getByText("17日");
    fireEvent.click(startDate);
    fireEvent.click(endDate);
    expect(middleDate).toHaveStyle("background-color: #006edc");
  });
});
