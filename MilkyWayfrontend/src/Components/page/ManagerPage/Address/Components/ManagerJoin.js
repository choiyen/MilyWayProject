import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { AddressDeletefetchData, AddressSelectfetchData } from "../api/util";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Card, CardList, CardRow, ResponsiveText } from "@/types/CardType/Card";
const MainWapper = styled.div `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    min-height: 73vh; /* 모바일에서는 내용에 따라 늘어남 */
  }
`;
const MainBox = styled.div `
  width: 75%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Label = styled.span `
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-bottom: 1rem;
  }
`;
const TableWrapper = styled.div `
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.75rem;
    border: 1px solid #ccc;
    text-align: left;
  }

  th {
    background-color: #f0f0f0;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
  }

  td {
    font-size: 0.875rem;
  }

  @media (max-width: 768px) {
    display: none; /* 모바일에서는 테이블 숨김 */
  }
`;
const DeleteButton = styled.button `
  margin-top: 1rem;
  padding: 0.5rem 0.8rem;
  border: none;
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background-color: #d9363e;
  }
`;
export const ManagerJoin = () => {
    const [Sign, setSign] = useState(null);
    const navigate = useNavigate();
    const TotalPage = useRef(0);
    const [refreshKey, setrefreshKey] = useState(false);
    const [currentPage, setcurrentPage] = useState(0);
    const FuncClick = (name) => {
        navigate(name);
    };
    useEffect(() => {
        console.log("주소 관리 페이지가 로드되었습니다." + currentPage);
        AddressSelectfetchData(currentPage).then((res) => {
            console.log("주소 조회 결과:", res);
            setSign(res.pageDTO.list);
            TotalPage.current = res.pageDTO.pageCount;
        });
    }, [refreshKey]);
    const handleClick = (AddressId) => {
        AddressDeletefetchData(AddressId)
            .then((res) => {
            if (res.resultType === "success") {
                AddressSelectfetchData(currentPage).then((res) => {
                    Swal.fire({
                        title: "삭제 성공",
                        text: "청소 예약 정보가 삭제되었습니다.",
                        icon: "success",
                        confirmButtonText: "확인",
                    });
                    setSign(res.pageDTO.list);
                    setrefreshKey(!refreshKey);
                });
            }
        })
            .catch((err) => {
            Swal.fire({
                title: "삭제 실패",
                text: "청소 예약 정보 삭제에 실패했습니다. 다시 시도해주세요.",
                icon: "error",
                confirmButtonText: "확인",
            });
            console.error("삭제 실패:", err);
        });
    };
    return (_jsx(MainWapper, { children: _jsxs(MainBox, { children: [_jsx(Fontname, { children: "\uC628\uB77C\uC778 \uC608\uC57D \uAD00\uB9AC" }), _jsx(Label, { children: "\uCCAD\uC18C \uB0A0\uC9DC\uAC00 \uC9C0\uB09C \uB370\uC774\uD130\uB294 \uC790\uB3D9 \uC0AD\uC81C \uB429\uB2C8\uB2E4." }), _jsx(TableWrapper, { children: _jsxs("table", { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "\uCCAD\uC18C\uC720\uD615" }), _jsx("th", { children: "\uACE0\uAC1D\uBA85" }), _jsx("th", { children: "\uC8FC\uC18C" }), _jsx("th", { children: "\uC804\uD654\uBC88\uD638" }), _jsx("th", { children: "\uB0A0\uC9DC" }), _jsx("th", { children: "\uD3C9\uC218" }), _jsx("th", { children: "\uC0AD\uC81C" })] }) }), _jsx("tbody", { children: Sign && Sign.length !== 0 ? (Sign.map((date, index) => (_jsxs("tr", { children: [_jsx("td", { children: date.cleanType }), _jsx("td", { children: date.customer }), _jsx("td", { children: date.address }), _jsx("td", { children: date.phoneNumber }), _jsx("td", { children: date.submissionDate }), _jsx("td", { children: date.acreage }), _jsx("td", { children: _jsx("button", { onClick: () => date.addressId && handleClick(date.addressId), children: "\uC0AD\uC81C" }) })] }, index)))) : (_jsx("tr", { children: _jsx("td", { colSpan: 7, style: {
                                            textAlign: "center",
                                            padding: "2rem",
                                            color: "#2563eb",
                                            fontWeight: "bold",
                                        }, children: "\uCD5C\uADFC \uD55C\uB2EC\uC5D0 \uD574\uB2F9\uD558\uB294 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) })] }) }), _jsx(CardList, { children: Sign && Sign.length !== 0 ? (Sign.map((date, index) => (_jsxs(Card, { children: [_jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uCCAD\uC18C\uC720\uD615" }), _jsx("span", { className: "value", children: date.cleanType })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uACE0\uAC1D\uBA85" }), _jsx("span", { className: "value", children: date.customer })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC8FC\uC18C" }), _jsx("span", { className: "value", children: date.address })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uC804\uD654\uBC88\uD638" }), _jsx("span", { className: "value", children: date.phoneNumber })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uB0A0\uC9DC" }), _jsx("span", { className: "value", children: date.submissionDate })] }), _jsxs(CardRow, { children: [_jsx("span", { className: "label", children: "\uD3C9\uC218" }), _jsx("span", { className: "value", children: date.acreage })] }), _jsx(DeleteButton, { onClick: () => date.addressId && handleClick(date.addressId), children: "\uC0AD\uC81C" })] }, index)))) : (_jsx(ResponsiveText, { children: _jsx("div", { children: "\uCD5C\uADFC \uD55C\uB2EC\uC5D0 \uD574\uB2F9\uD558\uB294 \uB370\uC774\uD130\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4." }) })) }), TotalPage.current > 0 && (_jsx("div", { className: "flex justify-center mt-3", children: _jsx("div", { className: "flex items-center space-x-6 gap-10", children: _jsxs("div", { className: "flex items-center space-x-2 gap-5", children: [_jsx("button", { className: "px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none", "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0", onClick: () => {
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
                                    }, children: ">" })] }) }) })), _jsx(LastButton, { onClick: () => FuncClick(GateWayNumber.Manager + "/" + ManagerGateWayType.Address), children: "\uC815\uBCF4 \uCD94\uAC00" })] }) }));
};
