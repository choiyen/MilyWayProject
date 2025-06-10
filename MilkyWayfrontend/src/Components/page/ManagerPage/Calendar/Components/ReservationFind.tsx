import { paths } from "@/config/paths/paths";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { LastButton, SmallButton } from "@/SCSS/Fixed";
import { ReservationType } from "@/types/Feature/Address/Reservation";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/SCSS/tailwind.scss";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Card, CardList, CardRow } from "@/types/CardType/Card";
import styled from "styled-components";

type ReservationProps = {
  selectDate: string;
  handleCancel: (id: string) => void;
  administrationId: string;
};

const CardRowReset = styled(CardRow)`
  display: flex;
  flex-direction: column;
`;

const ReservationFind = ({
  selectDate,
  handleCancel,
  administrationId,
}: ReservationProps) => {
  const [Reservation, setReservation] = useState<ReservationType>();
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
      } else if (res.resultType == "empty") {
        setReservation({
          name: "",
          acreage: "",
          phone: "",
          Address: "",
          SubssionDate: "",
          type: "",
        });
      } else {
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
    if (
      Reservation?.name == "" ||
      Reservation?.SubssionDate == "" ||
      Reservation?.Address == "" ||
      Reservation?.phone == "" ||
      Reservation?.acreage == "" ||
      Reservation?.type == ""
    ) {
      toast.error("데이터 수립에 오류가 발생했습니다. 관리자에게 문의하세요.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
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
        } else {
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

  const Classnametheads =
    "px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300 text-center";
  const Classtbodys = "px-4 py-3 text-sm text-gray-800 border border-gray-300";

  const width = useWindowWidth();
  const isMobile = width <= 600;
  return (
    <div>
      <div>
        {Reservation &&
          (isMobile ? (
            <CardList>
              <Card>
                <CardRow>
                  <span>청소 유형</span>
                  <span>{Reservation.type}</span>
                </CardRow>
                <CardRow>
                  <span>의뢰자명</span>
                  <span>{Reservation.name}</span>
                </CardRow>
                <CardRowReset>
                  <div
                    style={{
                      display: "table",
                      width: "100%",
                      borderCollapse: "collapse",
                      border: "1px solid #ccc",
                    }}
                  >
                    <div style={{ display: "table-row" }}>
                      <div
                        style={{
                          display: "table-cell",
                          width: "20%",
                          fontWeight: "bold",
                          backgroundColor: "#f7f7f7",
                          border: "1px solid #ccc",
                          textAlign: "center",
                          padding: "8px",
                          lineHeight: "auto",
                        }}
                      >
                        주소
                      </div>
                      <div
                        style={{
                          display: "table-cell",
                          width: "80%",
                          border: "1px solid #ccc",
                          padding: "8px",
                        }}
                      >
                        {Reservation.Address}
                      </div>
                    </div>
                  </div>
                </CardRowReset>
                <CardRow>
                  <span>전화번호</span>
                  <span>{Reservation.phone}</span>
                </CardRow>
              </Card>
            </CardList>
          ) : (
            <div className="p-6">
              <table className="min-w-full divide-y divide-gray-200 shadow rounded-2xl overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className={Classnametheads}>청소유형</th>
                    <th className={Classnametheads}>의뢰자명</th>
                    <th className={Classnametheads}>주소</th>
                    <th className={Classnametheads}>전화번호</th>
                    <th className={Classnametheads}>예약요청일</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-800">
                      {Reservation.type}
                    </td>
                    <td className={Classtbodys}>{Reservation.name}</td>
                    <td className={Classtbodys}>{Reservation.Address}</td>
                    <td className={Classtbodys}>{Reservation.phone}</td>
                    <td className={Classtbodys}>{Reservation.SubssionDate}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        {isMobile ? (
          <div className="flex items-center justify-between">
            <SmallButton onClick={handleAddress}>예약 확정</SmallButton>
            <SmallButton onClick={() => handleCancel(administrationId)}>
              예약 취소
            </SmallButton>
          </div>
        ) : (
          <div className="flex items-center">
            <LastButton onClick={handleAddress}>예약 확정</LastButton>
            <LastButton onClick={() => handleCancel(administrationId)}>
              예약 취소
            </LastButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationFind;
function fetchData() {
  throw new Error("Function not implemented.");
}
