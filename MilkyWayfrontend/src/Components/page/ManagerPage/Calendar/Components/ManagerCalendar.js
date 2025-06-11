import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CalendarWapper, CalendarsWrapper } from "../style/CalendarStyle";
import { CalendarHeader } from "../ui/CalendarHeader";
import userCalendar from "@/types/hooks/useCalendar";
import { CalendarGrid } from "../ui/CalendarGrid";
import { ScheduleInfo } from "../ui/ScheduleInfo";
import { ScheduleModal } from "../ui/ScheduleModal";
import { LastButton } from "@/SCSS/Fixed";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
export const ManagerCalendar = () => {
    const dispatch = useDispatch();
    const calendar = userCalendar();
    const [change, setChange] = useState(false);
    const [date, setDate] = useState(null);
    const [type, setType] = useState("휴일");
    const [select, setSelect] = useState(null);
    const [admintration, setAdmintration] = useState([]);
    const [address, setAddress] = useState([]);
    // const [FirstDate, setFirstDate] = useState<string>();
    useEffect(() => {
        const fetchData = async () => {
            calendar.currentDate = new Date(calendar.currentDate.getFullYear(), calendar.currentDate.getMonth(), 2);
            await POST({
                url: paths.Administration.search.path +
                    `/${calendar.currentDate.toISOString().slice(0, 10)}`,
            }).then((res) => {
                setAdmintration(res.data);
            });
        };
        fetchData();
    }, [calendar.currentDate, date]);
    useEffect(() => {
        const fetchData = async () => {
            await GET({
                url: paths.Address.search.Date.path,
                params: {
                    AdminstrationDate: date?.toLocaleDateString("sv-SE").split("T")[0] ||
                        new Date().toISOString().split("T")[0],
                },
            })
                .then((res) => {
                setAddress(res.data);
            })
                .catch(() => {
                setAddress([]);
            });
        };
        fetchData();
    }, [date]);
    const fetchData = async () => {
        const [adminRes, addressRes] = await Promise.all([
            GET({ url: paths.Administration.search.path }),
            GET({ url: paths.Address.search.defaul.path }),
        ]);
        setAdmintration(adminRes.data);
        setAddress(addressRes.data);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(CalendarWapper, { children: [_jsx(CalendarHeader, { calendar: calendar, setSelect: setSelect }), _jsx(CalendarsWrapper, { children: _jsx(CalendarGrid, { calendar: calendar, select: select, setSelect: setSelect, setDate: setDate, admintration: admintration }) }), _jsx(ScheduleInfo, { date: date, address: address, admintration: admintration, fetchData: fetchData }), _jsx(LastButton, { onClick: () => setChange(true), children: "\uC77C\uC815 \uCD94\uAC00" })] }), change && (_jsx(ScheduleModal, { setChange: setChange, date: date, setType: setType, type: type, dispatch: dispatch, setDate: setDate, fetchData: fetchData }))] }));
};
