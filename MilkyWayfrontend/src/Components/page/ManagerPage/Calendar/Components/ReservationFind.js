import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { paths } from "@/config/paths/paths";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { LastButton, SmallButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/SCSS/tailwind.scss";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Card, CardList, CardRow } from "@/types/CardType/Card";
import styled from "styled-components";
const CardRowReset = styled(CardRow) `
  display: flex;
  flex-direction: column;
`;
const ReservationFind = ({ selectDate, handleCancel, administrationId, }) => {
    const [Reservation, setReservation] = useState();
    const nativeGate = useNavigate();
    const FindReservation = async () => {
        await GET({
            url: paths.reserve.serach.path + "/admin",
            params: {
                AdminstrationDate: selectDate,
            },
        }).then((res) => {
            if (res.resultType == "success") {
                setReservation({
                    name: res.data[0].name,
                    acreage: res.data[0].acreage,
                    phone: res.data[0].phone,
                    Address: res.data[0].address,
                    SubssionDate: res.data[0].subissionDate,
                    type: res.data[0].type,
                });
            }
            else if (res.resultType == "empty") {
                setReservation({
                    name: "",
                    acreage: "",
                    phone: "",
                    Address: "",
                    SubssionDate: "",
                    type: "",
                });
            }
            else {
                toast.error("데이터를 가져오는데 실패했습니다. 관리자 문의 바람!!!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    };
    useEffect(() => {
        FindReservation();
    }, []);
    const handleAddress = async () => {
        if (Reservation?.name == "" ||
            Reservation?.SubssionDate == "" ||
            Reservation?.Address == "" ||
            Reservation?.phone == "" ||
            Reservation?.acreage == "" ||
            Reservation?.type == "") {
            toast.error("데이터 수립에 오류가 발생했습니다. 관리자에게 문의하세요.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            await POST({
                url: paths.Address.basic.path,
                data: {
                    customer: Reservation?.name,
                    address: Reservation?.Address,
                    phoneNumber: Reservation?.phone,
                    acreage: Reservation?.acreage,
                    cleanType: Reservation?.type,
                    submissionDate: Reservation?.SubssionDate,
                },
            }).then((res) => {
                if (res.resultType == "error") {
                    toast.error("예약 확정에 실패했습니다. 관리자에게 문의하세요.", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                else {
                    Swal.fire({
                        icon: "success",
                        title: "예약이 확정되었습니다.",
                        text: "고객님께서 요청하신 청소 예약이 확정되었습니다.",
                        confirmButtonText: "확인",
                    });
                    nativeGate(GateWayNumber.Manager + "/" + ManagerGateWayType.Join);
                }
            });
            await fetchData(); // 상태 갱신
        }
    };
    // const handleAddressCancel = () => {
    //   await POST({
    //     url: paths.Administration.search.path,
    //   });
    // };
    const Classnametheads = "px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300 text-center";
    const Classtbodys = "px-4 py-3 text-sm text-gray-800 border border-gray-300";
    const width = useWindowWidth();
    const isMobile = width <= 600;
    return (_jsx("div", { children: _jsxs("div", { children: [Reservation &&
                    (isMobile ? (_jsx(CardList, { children: _jsxs(Card, { children: [_jsxs(CardRow, { children: [_jsx("span", { children: "\uCCAD\uC18C \uC720\uD615" }), _jsx("span", { children: Reservation.type })] }), _jsxs(CardRow, { children: [_jsx("span", { children: "\uC758\uB8B0\uC790\uBA85" }), _jsx("span", { children: Reservation.name })] }), _jsx(CardRowReset, { children: _jsx("div", { style: {
                                            display: "table",
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            border: "1px solid #ccc",
                                        }, children: _jsxs("div", { style: { display: "table-row" }, children: [_jsx("div", { style: {
                                                        display: "table-cell",
                                                        width: "20%",
                                                        fontWeight: "bold",
                                                        backgroundColor: "#f7f7f7",
                                                        border: "1px solid #ccc",
                                                        textAlign: "center",
                                                        padding: "8px",
                                                        lineHeight: "auto",
                                                    }, children: "\uC8FC\uC18C" }), _jsx("div", { style: {
                                                        display: "table-cell",
                                                        width: "80%",
                                                        border: "1px solid #ccc",
                                                        padding: "8px",
                                                    }, children: Reservation.Address })] }) }) }), _jsxs(CardRow, { children: [_jsx("span", { children: "\uC804\uD654\uBC88\uD638" }), _jsx("span", { children: Reservation.phone })] })] }) })) : (_jsx("div", { className: "p-6", children: _jsxs("table", { className: "min-w-full divide-y divide-gray-200 shadow rounded-2xl overflow-hidden", children: [_jsx("thead", { className: "bg-gray-100", children: _jsxs("tr", { children: [_jsx("th", { className: Classnametheads, children: "\uCCAD\uC18C\uC720\uD615" }), _jsx("th", { className: Classnametheads, children: "\uC758\uB8B0\uC790\uBA85" }), _jsx("th", { className: Classnametheads, children: "\uC8FC\uC18C" }), _jsx("th", { className: Classnametheads, children: "\uC804\uD654\uBC88\uD638" }), _jsx("th", { className: Classnametheads, children: "\uC608\uC57D\uC694\uCCAD\uC77C" })] }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-100", children: _jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3 text-sm text-gray-800", children: Reservation.type }), _jsx("td", { className: Classtbodys, children: Reservation.name }), _jsx("td", { className: Classtbodys, children: Reservation.Address }), _jsx("td", { className: Classtbodys, children: Reservation.phone }), _jsx("td", { className: Classtbodys, children: Reservation.SubssionDate })] }) })] }) }))), isMobile ? (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(SmallButton, { onClick: handleAddress, children: "\uC608\uC57D \uD655\uC815" }), _jsx(SmallButton, { onClick: () => handleCancel(administrationId), children: "\uC608\uC57D \uCDE8\uC18C" })] })) : (_jsxs("div", { className: "flex items-center", children: [_jsx(LastButton, { onClick: handleAddress, children: "\uC608\uC57D \uD655\uC815" }), _jsx(LastButton, { onClick: () => handleCancel(administrationId), children: "\uC608\uC57D \uCDE8\uC18C" })] }))] }) }));
};
export default ReservationFind;
function fetchData() {
    throw new Error("Function not implemented.");
}
