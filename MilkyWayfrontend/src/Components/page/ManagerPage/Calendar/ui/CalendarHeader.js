import { jsxs as _jsxs } from "react/jsx-runtime";
import { subMonths } from "date-fns";
export const CalendarHeader = ({ calendar, setSelect, }) => (_jsxs("div", { className: "flex justify-between items-center w-3/4 px-6 my-10 bg-white shadow-md rounded-lg py-4", children: [_jsxs("button", { onClick: () => calendar.setCurrentDate(subMonths(calendar.currentDate, 1)), className: "\r\n    px-3 py-1 text-sm\r\n    sm:px-4 sm:py-2 sm:text-lg\r\n    font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow\r\n  ", children: ["<", " \uC774\uC804"] }), _jsxs("span", { className: "text-2xl font-semibold text-gray-800 max-sm:text-lg", children: [calendar.getCurrentYear(), "\uB144 ", calendar.getCurrentMonth(), "\uC6D4"] }), _jsxs("button", { onClick: () => {
                calendar.setCurrentDate(subMonths(calendar.currentDate, -1));
                setSelect(null);
            }, className: "\r\n    px-3 py-1 text-sm\r\n    sm:px-4 sm:py-2 sm:text-lg\r\n    font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow", children: ["\uB2E4\uC74C ", ">"] })] }));
