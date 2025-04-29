import { subMonths } from "date-fns";

interface CalendarHeaderProps {
  calendar: {
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    getCurrentYear: () => number;
    getCurrentMonth: () => number;
  };
  setSelect: (value: number | null) => void;
}

export const CalendarHeader = ({
  calendar,
  setSelect,
}: CalendarHeaderProps) => (
  <div className="flex justify-between items-center w-3/4 px-6 my-10 bg-white shadow-md rounded-lg py-4">
    <button
      onClick={() =>
        calendar.setCurrentDate(subMonths(calendar.currentDate, 1))
      }
      className="px-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
    >
      {"<"} 이전
    </button>
    <span className="text-2xl font-semibold text-gray-800">
      {calendar.getCurrentYear()}년 {calendar.getCurrentMonth()}월
    </span>
    <button
      onClick={() => {
        calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
        setSelect(null);
      }}
      className="px-4 py-2 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow"
    >
      다음 {">"}
    </button>
  </div>
);
