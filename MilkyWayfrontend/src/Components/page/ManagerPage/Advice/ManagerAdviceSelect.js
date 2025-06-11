import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { paths } from "@/config/paths/paths";
import { DELETE, POST } from "@/config/request/axios/axiosInstance";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Card, CardList, CardRow, ResponsiveText } from "@/types/CardType/Card";
const DeleteButton = styled.button `
  width: 100%;
  background: #e74c3c;
  color: white;
  border: none;
  margin: 0;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #c0392b;
  }
`;
export const ManagerAdviceSelect = () => {
    const [Advicedummy, setAdvicedummy] = useState([]);
    const navigate = useNavigate();
    const [currentPage, setcurrentPage] = useState(0);
    const [refreshKey, setrefreshKey] = useState(false);
    const TotalPage = useState({ current: 0 })[0]; // ✅ 상태로 관리
    const windowWidth = useWindowWidth();
    const isMobile = windowWidth <= 600; // 모바일 여부 확인
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await POST({
                    url: paths.Notice.serach.path,
                });
                // ✅ 중복 방지를 위해 지역 변수로 선언
                const Notice = [];
                if (Array.isArray(res.data)) {
                    for (let i = 0; i < res.data.length; i++) {
                        Notice.push({
                            noticeId: res.data[i].noticeId,
                            title: res.data[i].title,
                            type: res.data[i].type,
                            titleimg: "",
                            greeting: "",
                        });
                    }
                    setAdvicedummy(Notice); // 상태 업데이트
                }
                else {
                    console.warn("Unexpected data format:", res.data);
                    Swal.fire({
                        icon: "warning",
                        title: "데이터 오류",
                        text: "후기 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
                        confirmButtonText: "확인",
                    });
                }
            }
            catch (error) {
                console.error("Failed to fetch advice data:", error);
                Swal.fire({
                    icon: "error",
                    title: "오류 발생",
                    text: "후기 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
                    confirmButtonText: "확인",
                });
            }
        };
        fetchData();
    }, []);
    const handleRowClick = (noticeId) => {
        navigate(GateWayNumber.Manager + `/editNotice/${noticeId}`);
    };
    const handleDeleteClick = (noticeId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            DELETE({
                url: paths.Notice.basic.path,
                params: {
                    noticeId: noticeId,
                },
            })
                .then((res) => {
                if (res.resultType === "success") {
                    Swal.fire({
                        icon: "success",
                        title: "삭제 완료",
                        text: "후기가 성공적으로 삭제되었습니다.",
                        confirmButtonText: "확인",
                    });
                    setAdvicedummy((prev) => prev.filter((item) => item.noticeId !== noticeId));
                }
                else {
                    toast.error("후기를 삭제하는데 실패했습니다. 다시 시도해주세요.", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })
                .catch((error) => {
                toast.error("Error deleting advice:" + error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        }
    };
    return (_jsx("div", { className: "m-0 h-70", children: _jsxs("div", { className: "flex flex-col justify-center items-center min-h-screen bg-gray-100", children: [_jsx(Fontname, { children: "\uC628\uB77C\uC778 \uD6C4\uAE30 \uAD00\uB9AC" }), _jsx("div", { className: "w-9/12 flex flex-col px-4 py-4 overflow-y-auto", children: _jsxs("div", { className: "flex flex-col gap-4 w-full mx-auto", children: [isMobile ? (_jsx("div", { className: "text-center text-gray-500 mb-4", children: _jsx(CardList, { children: Advicedummy && Advicedummy.length !== 0 ? (Advicedummy.map((date, index) => (_jsxs(Card, { onClick: () => handleRowClick(date.noticeId ?? ""), children: [_jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uBC88\uD638" }), _jsx("span", { className: "value", children: Number(index) + 1 })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC81C\uBAA9" }), _jsx("span", { className: "value", children: date.title })] }), _jsx(DeleteButton, { onClick: (e) => {
                                                    e.stopPropagation(); // ✅ 행 클릭 이벤트 전파 막기
                                                    handleDeleteClick(date.noticeId ?? "");
                                                }, children: "\uC0AD\uC81C" })] }, index)))) : (_jsx(ResponsiveText, { children: _jsx("div", { children: "\uCD5C\uADFC \uD55C\uB2EC\uC5D0 \uD574\uB2F9\uD558\uB294 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) }) })) : (_jsxs("table", { className: "min-w-full bg-white border border-gray-300 rounded-lg shadow-md", children: [_jsx("thead", { className: "bg-gray-200 text-gray-600 text-sm font-semibold uppercase", children: _jsxs("tr", { children: [_jsx("th", { className: "px-6 py-3 text-left", children: "\uAD00\uB9AC\uBC88\uD638" }), _jsx("th", { className: "px-6 py-3 text-left", children: "\uC81C\uBAA9" }), _jsx("th", { className: "px-6 py-3 text-left", children: "\uCCAD\uC18C\uC720\uD615" }), _jsx("th", { className: "px-6 py-3 text-left", children: "\uC0AD\uC81C" })] }) }), _jsx("tbody", { className: "text-gray-700 text-sm", children: Advicedummy.length > 0 ? (Advicedummy.map((item, index) => (_jsxs("tr", { onClick: () => handleRowClick(item.noticeId ?? ""), className: "cursor-pointer hover:bg-gray-100", children: [_jsx("td", { className: "border px-6 py-3 whitespace-nowrap", children: index + 1 }), _jsx("td", { className: "border px-6 py-3 whitespace-nowrap", children: item.title }), _jsx("td", { className: "border px-6 py-3 whitespace-nowrap", children: item.type }), _jsx("td", { className: "border px-6 py-3 whitespace-nowrap text-center", children: _jsx(DeleteButton, { onClick: (e) => {
                                                            e.stopPropagation(); // ✅ 행 클릭 이벤트 전파 막기
                                                            handleDeleteClick(item.noticeId ?? "");
                                                        }, children: "\uD83D\uDDD1 \uC0AD\uC81C" }) })] }, item.noticeId)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 4, className: "text-center py-10 text-blue-600 font-bold text-lg border-t", children: "\uAD00\uB9AC\uD574\uC57C \uD560 \uC628\uB77C\uC778 \uD6C4\uAE30\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] })), TotalPage.current > 0 && (_jsx("div", { className: "flex justify-center mt-3", children: _jsx("div", { className: "flex items-center space-x-6 gap-10", children: _jsxs("div", { className: "flex items-center space-x-2 gap-5", children: [_jsx("button", { className: "px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none", "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0", onClick: () => {
                                                    if (currentPage <= 0) {
                                                        toast.error("첫 페이지입니다.", {
                                                            position: "top-center",
                                                        });
                                                        return;
                                                    }
                                                    setcurrentPage(currentPage - 1);
                                                    setrefreshKey(!refreshKey);
                                                }, children: "<" }), Array.from({ length: TotalPage.current }, (_, index) => (_jsx("button", { className: "px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-blue-100 focus:outline-none", onClick: () => {
                                                    setcurrentPage(index);
                                                    setrefreshKey(!refreshKey);
                                                }, children: index + 1 }, index))), _jsx("button", { className: "px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none", "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0", onClick: () => {
                                                    if (currentPage + 1 < TotalPage.current) {
                                                        setcurrentPage(currentPage + 1);
                                                        setrefreshKey(!refreshKey);
                                                    }
                                                    else {
                                                        toast.error("마지막 페이지입니다.", {
                                                            position: "top-center",
                                                        });
                                                    }
                                                }, children: ">" })] }) }) })), _jsx("div", { className: "flex justify-center items-center mt-2", children: _jsx(LastButton, { className: "bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300", onClick: () => {
                                        navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Advice);
                                    }, children: "\uD6C4\uAE30 \uCD94\uAC00" }) })] }) })] }) }));
};
