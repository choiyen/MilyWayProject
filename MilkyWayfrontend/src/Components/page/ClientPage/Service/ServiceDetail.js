import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { paths } from "@/config/paths/paths";
import { GET } from "@/config/request/axios/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Greeting } from "./Component/Greeting";
import { Slider } from "@/Components/Common/ui/Slider/Slider";
import maincart from "./Type/cb61434e-cdfa-41d3-9b4e-79f14556d81b.png";
import { InquireText } from "../Main/Component/InquireText";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";
const ServiceDetail = () => {
    const { ServiceId } = useParams();
    console.log("Service ID:", ServiceId);
    const [notice, setNotice] = useState();
    const [noticeDetails, setNoticeDetails] = useState([]);
    const fetchServiceDetails = async (id) => {
        try {
            await GET({
                url: paths.Notice.serach.path,
                params: { NoticeId: id },
            }).then((res) => {
                if (res.resultType === "success") {
                    // 여기에 서비스 세부 정보를 처리하는 로직을 추가하세요.
                    setNotice({
                        noticeId: res.data[0].noticeId,
                        title: res.data[0].title,
                        type: res.data[0].type,
                        titleimg: res.data[0].titleimg || "",
                        greeting: res.data[0].greeting || "",
                    });
                    console.log("Notice Data:", res.data[0].noticeDetailEntities);
                    setNoticeDetails(res.data[0].noticeDetailEntities);
                }
                else {
                    console.error("Failed to fetch service details:", res);
                }
            });
        }
        catch (error) {
            console.error("Error fetching service details:", error);
        }
    };
    useEffect(() => {
        fetchServiceDetails(ServiceId || "");
    }, [ServiceId]);
    useEffect(() => {
        console.log("Notice Details:", noticeDetails);
    }, [noticeDetails]);
    const [openModal, setOpenModal] = useState(false);
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "p-10 max-sm:p-0", children: [notice && (_jsxs("div", { className: "bg-slate-200", children: [_jsx("h1", { className: "text-2xl font-bold text-center bg-yellow-50 rounded-t-lg p-5 max-sm:p-2", children: notice.title }), notice.titleimg && (_jsx("img", { src: notice.titleimg, alt: "Title Image", className: "w-full h-[500px] object-cover p-5 max-sm:h-[400px]" })), _jsxs("p", { className: "text-gray-700 text-right bg-orange-100 p-3 font-", children: ["Type: ", notice.type] }), _jsx(Greeting, { GreetingText: notice.greeting || "" })] })), noticeDetails.length > 0 ? (_jsx("div", { children: noticeDetails.map((detail, index) => (_jsxs("div", { children: [_jsxs("div", { className: "bg-gray-100 p-5 flex flex-col justify-center items-center", children: [_jsx(Slider, { URL: detail.beforeURL }), _jsxs("h2", { className: "text-center font-bold", children: [detail.direction, " \uCCAD\uC18C \uC774\uC804 \uC0AC\uC9C4"] })] }), _jsxs("div", { className: "bg-gray-100 p-5 flex flex-col justify-center items-center", children: [_jsx(Slider, { URL: detail.afterURL }), _jsxs("h2", { className: "text-center font-bold", children: [detail.direction, " \uCCAD\uC18C \uC774\uD6C4 \uC0AC\uC9C4"] })] }), _jsx("div", { className: "text-gray-600", children: _jsx(Greeting, { GreetingText: detail.comment || "" }) })] }, index))) })) : (_jsx("div", { className: "p-4 text-center text-gray-500", children: "No service details available." })), _jsxs("div", { className: "grid grid-cols-3 gap-4 mt-10 px-4 max-sm:grid-cols-2 max-sm:gap-2 max-sm:px-2 mb-10", children: [_jsx("div", { className: "bg-blue-500 text-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full max-sm:col-span-2", children: _jsxs("div", { className: "flex items-center max-sm:flex-col max-sm:text-center", children: [_jsx("div", { className: "w-1/3 flex justify-center max-sm:w-full max-sm:mb-4", children: _jsx("img", { className: "w-3/4 max-sm:w-2/4", src: maincart, alt: "\uB9C8\uC2A4\uCF54\uD2B8\uC774\uBBF8\uC9C0" }) }), _jsxs("div", { className: "w-2/3 max-sm:w-full max-sm:text-xl", children: [_jsx("div", { children: "\uAC00\uC871 \uAC19\uC740 \uB9C8\uC74C\uC73C\uB85C, \uCCAD\uC18C\uC5D0 \uC784\uD569\uB2C8\uB2E4." }), _jsx("div", { children: "\uC785\uC8FC, \uC774\uC0AC, \uAC70\uC8FC, \uC900\uACF5 \uCCAD\uC18C\uC758 \uBAA8\uB4E0 \uAC83!" }), _jsxs("div", { className: "font-semibold mt-2 max-sm:text-[18px]", children: ["\uCCAD\uC18C\uB294 ", _jsx("strong", { className: "text-black", children: "\uC740\uD558\uC218\uD648\uCF00\uC5B4" }), "\uC640 \uD568\uAED8!"] })] })] }) }), _jsx("div", { className: "bg-white p-4 md:p-6 rounded-xl shadow-md hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full", children: _jsxs(Link, { to: GateWayNumber.Client + "/" + ClientGateWayType.Service, children: [_jsx("span", { className: "block text-sm md:text-lg font-semibold mb-1 text-slate-800", children: "Information" }), _jsx("span", { className: "text-gray-600", children: "\uC774\uC6A9\uC548\uB0B4" })] }) }), _jsxs("div", { onClick: () => setOpenModal(true), className: "bg-slate-200 p-4 md:p-6 rounded-xl shadow-md hover:bg-slate-100 hover:shadow-lg cursor-pointer transition-all duration-200 text-[10px] md:text-sm w-full", children: [_jsx("span", { className: "block text-sm md:text-lg font-semibold mb-1 text-slate-800", children: "Contact" }), _jsx("span", { className: "text-gray-600", children: "\uACAC\uC801 \uBB38\uC758" })] })] }), openModal && (_jsx("div", { className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex justify-center items-center", children: _jsxs("div", { className: "relative w-full md:w-auto md:min-w-[700px] bg-white rounded-t-2xl md:rounded-xl shadow-lg animate-slide-up md:animate-fade-in", children: [_jsx("button", { onClick: () => setOpenModal(false), className: "absolute top-2 right-4 text-xl font-bold text-gray-600 hover:text-red-500", children: "\u2715" }), _jsx(InquireText, {})] }) }))] }) }));
};
export default ServiceDetail;
