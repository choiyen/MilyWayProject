import { SmallButton } from "@/SCSS/Fixed";
import { AddressType } from "@/types/Feature/Address/AddressType";
import { AdministrationType } from "@/types/Feature/Address/Adminstration";
import { administrationDeletefetchData } from "../api/Dayutil";
import ReservationFind from "../Components/ReservationFind";
import "@/SCSS/tailwind.scss";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Card, CardList, CardRow } from "@/types/CardType/Card";

interface ScheduleInfoProps {
  date: Date | null;
  address: AddressType[];
  admintration: AdministrationType[];
  fetchData: () => Promise<void>;
}

export const ScheduleInfo = ({
  date,
  address,
  admintration,
  fetchData,
}: ScheduleInfoProps) => {
  const matched =
    address?.filter((item) => {
      if (!date || !item.submissionDate) return false;

      const itemDate = new Date(item.submissionDate);
      if (isNaN(itemDate.getTime())) return false;

      return itemDate.toDateString() === date.toDateString();
    }) || [];

  const matched2 =
    admintration?.filter((item) => {
      if (!date || !item.administrationDate) return false;

      const itemDate = new Date(item.administrationDate);
      if (isNaN(itemDate.getTime())) return false;

      return (
        itemDate.toDateString() === date.toDateString() &&
        (item.adminstrationType === "휴일" || item.adminstrationType === "예약")
      );
    }) || [];

  const handleAdminDelete = async (id: string) => {
    await administrationDeletefetchData(id);
    await fetchData(); // 상태 갱신
  };
  const width = useWindowWidth();
  const isMobile = width <= 600;

  return (
    <div className="mt-6 w-full">
      {matched.length > 0 ? (
        <div className="overflow-x-auto border w-3/4 border-gray-300 rounded-lg shadow-sm j mx-auto">
          {isMobile ? (
            <div>
              {matched.map((item, index) => (
                <CardList>
                  <Card>
                    <CardRow>
                      <span className="label">번호</span>
                      <span className="value">{Number(index) + 1}</span>
                    </CardRow>
                    <CardRow>
                      <span className="label">청소 유형</span>
                      <span className="value">{item.cleanType}</span>
                    </CardRow>
                    <CardRow>
                      <span className="label">예약자</span>
                      <span className="value">{item.customer}</span>
                    </CardRow>
                    <CardRow>
                      <span className="label">전화번호</span>
                      <span className="value">{item.phoneNumber}</span>
                    </CardRow>
                    <CardRow>
                      <span className="label">주소</span>
                      <span className="value">{item.address}</span>
                    </CardRow>
                    <CardRow>
                      <span className="label">실평수</span>
                      <span className="value">{item.acreage}</span>
                    </CardRow>
                  </Card>
                </CardList>
              ))}
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="px-4 py-3 border">청소 유형</th>
                  <th className="px-4 py-3 border">예약자</th>
                  <th className="px-4 py-3 border">전화번호</th>
                  <th className="px-4 py-3 border">주소</th>
                  <th className="px-4 py-3 border">실평수</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-800 text-base">
                {matched.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 border">{item.cleanType}</td>
                    <td className="px-4 py-3 border">{item.customer}</td>
                    <td className="px-4 py-3 border">{item.phoneNumber}</td>
                    <td className="px-4 py-3 border">{item.address}</td>
                    <td className="px-4 py-3 border">{item.acreage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      ) : matched2.length > 0 ? (
        matched2.map((item, index) => (
          <div
            key={index}
            className="bg-red-100 border border-red-400 text-red-800 rounded-lg px-6 py-4 mt-4 w-8/12 mx-auto text-center"
          >
            <p className="text-lg font-semibold mb-1">
              선택한 날짜:{" "}
              <span className="font-bold text-blue-700">
                {item.administrationDate}
              </span>
            </p>
            {item.adminstrationType == "휴일" ? (
              <div>
                <p className="text-md">
                  관리자 님께서 {item.adminstrationType}로 지정해놓으신
                  날입니다.
                </p>
                <SmallButton
                  onClick={() => handleAdminDelete(item.administrationId ?? "")}
                >
                  휴일 삭제
                </SmallButton>
              </div>
            ) : (
              <div>
                <p className="text-md">
                  고객 님의 예약이 들어온 날짜이니 확인 부탁드립니다.
                </p>
                <ReservationFind
                  selectDate={item.administrationDate}
                  handleCancel={() =>
                    handleAdminDelete(item.administrationId ?? "")
                  }
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="bg-red-100 border max-sm:text-sm border-green-400 text-blue-900 font-bold rounded-lg px-6 py-4 mt-4 w-8/12 h-[100px] mx-auto text-center flex items-center justify-center">
          {isMobile ? (
            <>
              아직 정해진 업무가 없네요!
              <br />
              새로운 업무가 있다면 추가해주세요.
            </>
          ) : (
            <>선택하신 날짜에는 등록된 일정이 없습니다.</>
          )}
        </div>
      )}
    </div>
  );
};
