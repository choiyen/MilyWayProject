import { WeekDay } from "@/types/Date/date";
import { AdministrationType } from "@/types/Feature/Address/Adminstration";

interface Props {
  calendar: {
    weekCalendarList: number[][];
    currentDate: Date;
  };
  select: number | null;
  setSelect: (value: number) => void;
  setDate: (value: Date) => void;
  admintration: AdministrationType[];
}

export const CalendarGrid = ({
  calendar,
  select,
  setSelect,
  setDate,
  admintration,
}: Props) => {
  const calendarList: number[][] = calendar.weekCalendarList;

  return (
    <>
      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 w-3/4 text-center font-semibold text-gray-700 border border-gray-300">
        {WeekDay.map((day, i) => (
          <div
            key={i}
            className="py-2 border-r border-b border-gray-300 last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 셀 */}
      {calendarList.map((week, weekIndex) => (
        <div
          key={weekIndex}
          className={`grid grid-cols-7 w-3/4 text-center ${
            weekIndex > 0 ? "border-t border-gray-300" : ""
          }`}
        >
          {week.map((day, dayIndex) => {
            if (day === 0) {
              return (
                <div
                  key={`${weekIndex}-${dayIndex}`}
                  className="border border-gray-300 h-[48px]"
                />
              );
            }

            const buttonDate = new Date(
              calendar.currentDate.getFullYear(),
              calendar.currentDate.getMonth(),
              day
            );
            const isSelected = select === day;
            const isMatched = admintration.some(
              (addr) =>
                new Date(addr.administrationDate).toDateString() ===
                buttonDate.toDateString()
            );
            const bOff = admintration.some((addr) => {
              return (
                new Date(addr.administrationDate).toDateString() ===
                  buttonDate.toDateString() && addr.adminstrationType === "업무"
              );
            });

            // 배경색 지정
            const bgColor = isSelected
              ? "bg-blue-600 text-white font-bold"
              : bOff
              ? "bg-yellow-200"
              : isMatched
              ? "bg-green-200"
              : "bg-white hover:bg-gray-100";

            // 주말 색상
            const isSunday = dayIndex === 0;
            const isSaturday = dayIndex === 6;
            const textColor = isSunday
              ? "text-red-500"
              : isSaturday
              ? "text-blue-500"
              : "text-gray-800";

            return (
              <button
                key={`${weekIndex}-${dayIndex}`}
                onClick={() => {
                  setSelect(day);
                  setDate(buttonDate);
                }}
                className={`h-[48px] border border-gray-300 w-full ${bgColor} ${textColor}`}
              >
                {day}
              </button>
            );
          })}
        </div>
      ))}
    </>
  );
};
