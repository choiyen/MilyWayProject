import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { paths } from "@/config/paths/paths";
import { GET } from "@/config/request/axios/axiosInstance";
import { Fontname } from "@/SCSS/Fixed";
import "@/SCSS/tailwind.scss";
import { Card, CardList, CardRow } from "@/types/CardType/Card";
import { GateWayNumber } from "@/types/GateWay/GateWayType";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ManagerInquires = () => {
    // 이 컴포넌트는 관리자 문의 페이지를 렌더링합니다.
    const [inquiries, setInquiries] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const nativeGate = useNavigate();
    const handeInquiryGET = async (page) => {
        return await GET({
            url: paths.Inqurie.serach.page.path,
            params: { page: page },
        });
    };
    useEffect(() => {
        // 페이지가 로드될 때 필요한 초기화 작업을 수행할 수 있습니다.
        // 예: API 호출, 상태 초기화 등
        handeInquiryGET(currentPage)
            .then((res) => {
            if (res.resultType === "success") {
                // 문의 데이터를 성공적으로 가져온 경우 상태를 업데이트합니다.
                // console.log("문의 데이터:", res.pageDTO.list);
                for (const inquiry of res.pageDTO.list) {
                    console.log("문의 데이터:", inquiry);
                    // inquiries 배열에 새로운 문의 데이터를 추가합니다.
                    // setInquiries((prev) => [...prev, inquiry]);
                    setInquiries((prev) => {
                        if (prev) {
                            return [...prev, inquiry];
                        }
                        else {
                            return [inquiry];
                        }
                    });
                }
                setInquiries(res.pageDTO.list);
                setTotalPages(res.pageDTO.pageCount);
            }
            else {
                toast.error("문의 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })
            .catch((err) => {
            toast.error("문의 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요." +
                err, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }, [currentPage]);
    const handlePageChange = (inquireid) => {
        // 데이터 확인 후 페이지를 변경합니다.
        console.log("문의 ID:", inquireid);
        nativeGate(GateWayNumber.Manager + "/" + `editInquire/${inquireid}` // 문의 상세 페이지로 이동
        );
    };
    const width = useWindowWidth();
    const isMobile = width <= 600;
    return (_jsxs("div", { className: "flex flex-col items-center h-full gap-10", children: [_jsx(Fontname, { children: " \uACE0\uAC1D \uBB38\uC758 " }), _jsx("div", { className: "text-gray-600 text-lg mt-4 max-sm:text-sm", children: "\uACE0\uAC1D\uB2D8\uB4E4\uC758 \uBB38\uC758\uC0AC\uD56D\uC744 \uD655\uC778\uD558\uACE0 \uAD00\uB9AC\uD558\uC138\uC694." }), isMobile ? (_jsx("div", { style: { width: "100%" }, children: inquiries && inquiries.length > 0 ? (inquiries.map((inquiry, index) => (_jsx(CardList, { children: _jsxs(Card, { children: [_jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC774\uB984" }), _jsx("span", { className: "value", children: inquiry.inquirename })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC8FC\uC18C" }), _jsx("span", { className: "value", children: inquiry.address })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uB0A0\uC9DC" }), _jsx("span", { className: "value", children: inquiry.dateOfInquiry })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC0C1\uD0DC" }), _jsx("span", { className: `value ${inquiry.inquireBool ? "text-green-600" : "text-red-500"}`, children: inquiry.inquireBool ? "확인" : "미확인" })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC804\uD654\uBC88\uD638" }), _jsx("span", { className: "value", children: inquiry.phoneNumber })] }), _jsx(CardRow, { children: _jsx("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                    }, children: _jsx("button", { className: "bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition w-28 h-10 flex items-center justify-center", onClick: () => handlePageChange(inquiry.inquireId), children: "\uD655\uC778" }) }) })] }) }, index)))) : (_jsx("div", { children: "\uBB38\uC758 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." })) })) : (_jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-gray-100", children: [_jsx("th", { className: "px-4 py-2 text-left", children: "\uBC88\uD638" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uC774\uB984" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uC8FC\uC18C" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uB0A0\uC9DC" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uC0C1\uD0DC" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uC804\uD654\uBC88\uD638" }), _jsx("th", { className: "px-4 py-2 text-left", children: "\uC751\uB2F5\uD655\uC778" })] }) }), _jsx("tbody", { children: inquiries && inquiries.length > 0 ? (inquiries.map((inquiry, index) => {
                            console.log("문의 데이터ddddd:", inquiry);
                            return (_jsxs("tr", { className: "hover:bg-gray-50", children: [_jsx("td", { className: "px-4 py-2", children: index + 1 }), _jsx("td", { className: "px-4 py-2", children: inquiry.inquirename }), _jsx("td", { className: "px-4 py-2", children: inquiry.address }), _jsx("td", { className: "px-4 py-2", children: inquiry.dateOfInquiry }), _jsx("td", { className: `px-4 py-2 ${inquiry.inquireBool ? "text-green-600" : "text-red-500"}`, children: inquiry.inquireBool ? "확인" : "미확인" }), _jsx("td", { className: "px-4 py-2", children: inquiry.phoneNumber }), _jsx("td", { className: "px-4 py-2", children: _jsx("button", { className: "bg-blue-500 text-white px-4 py-2 rounded", onClick: () => {
                                                // 문의 응답 확인 로직을 여기에 추가합니다.
                                                // 예: API 호출, 상태 업데이트
                                                handlePageChange(inquiry.inquireId);
                                                // 페이지 변경 함수 호출
                                            }, children: "\uD655\uC778" }) })] }, index));
                        })) : (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "text-center px-4 py-2", children: "\uBB38\uC758 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] })), _jsxs("div", { style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                }, children: [_jsx("button", { onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 0, className: `px-5 py-2 rounded-md font-semibold transition-colors ${currentPage === 0
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"}`, children: "\uC774\uC804" }), _jsx("div", { style: {
                            width: "40px",
                            height: "40px",
                            lineHeight: "40px", // 세로 중앙 정렬용
                            textAlign: "center",
                            fontWeight: "700",
                            fontSize: "1.25rem",
                            borderRadius: "50%",
                            backgroundColor: "#1f2937", // 배경색 넣으면 더 잘 보임
                            color: "white",
                            userSelect: "none",
                        }, children: currentPage + 1 }), _jsx("button", { onClick: () => {
                            if (currentPage >= totalPages - 1) {
                                toast.error("마지막 페이지입니다.", {
                                    position: "top-center",
                                    autoClose: 3000,
                                });
                                return;
                            }
                            setCurrentPage(currentPage + 1);
                        }, className: `px-5 py-2 rounded-md font-semibold transition-colors ${currentPage >= totalPages - 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"}`, children: "\uB2E4\uC74C" })] })] }));
};
export default ManagerInquires;
