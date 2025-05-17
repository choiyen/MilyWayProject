import { paths } from "@/config/paths/paths";
import { GET, POST } from "@/config/request/axios/axiosInstance";
import { LastButton, SmallButton } from "@/SCSS/Fixed";
import { ReservationType } from "@/types/Feature/Address/Reservation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type ReservationProps = {
  selectDate: string;
};

const ReservationFind = ({ selectDate }: ReservationProps) => {
  const dispatch = useDispatch();
  const [Reservation, setReservation] = useState<ReservationType>();

  const FindReservation = async () => {
    await GET({
      url: paths.reserve.serach.path + "/admin",
      params: {
        AdminstrationDate: selectDate,
      },
    }).then((res) => {
      console.log(res);
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
        alert("데이터를 가져오는데 실패했습니다. 관리자 문의 바람!!!");
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
      alert("데이터 수립에 오류가 발생했습니다. 관리자에게 문의하세요.");
    } else {
      await POST({
        url: paths.Address.basic.path,
        data: {
          customer: Reservation?.name,
          address: Reservation?.Address,
          phoneNumber: Reservation?.SubssionDate,
          acreage: Reservation?.acreage,
          cleanType: Reservation?.type,
        },
      });
    }
  };

  useEffect(() => {
    console.log(Reservation);
  }, [Reservation]);
  const Classnametheads =
    "px-4 py-3 text-left text-sm font-semibold text-gray-700 border border-gray-300 text-center";
  const Classtbodys = "px-4 py-3 text-sm text-gray-800 border border-gray-300";
  return (
    <div>
      <div>
        {Reservation && (
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
        )}
        <LastButton onClick={handleAddress}>예약 확정</LastButton>
      </div>
    </div>
  );
};

export default ReservationFind;
