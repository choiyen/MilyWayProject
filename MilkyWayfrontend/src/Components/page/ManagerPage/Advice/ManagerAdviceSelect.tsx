import { useEffect, useState } from "react";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { NoticeFulldummy, NoticeFullType } from "@/types/Feature/Notice/NoFull";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";

export const ManagerAdviceSelect = () => {
  const [Advicedummy, setAdvicedummy] = useState<NoticeFullType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAdvicedummy(NoticeFulldummy);
  }, []);

  // 클릭된 테이블 행의 데이터를 기반으로 수정 페이지로 이동하는 함수
  const handleRowClick = (noticeId: string) => {
    navigate(`/editNotice/${noticeId}`); // 수정 페이지로 이동, `noticeId`를 URL 파라미터로 전달
  };

  return (
    <div className="m-0 h-70">
      <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100">
        <Fontname>온라인 후기 관리</Fontname>
        <div className="w-full flex flex-col px-4 py-4 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full mx-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">관리번호</th>
                  <th className="px-6 py-3 text-left">제목</th>
                  <th className="px-6 py-3 text-left">청소유형</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {Advicedummy.map((item) => (
                  <tr
                    key={item.Notice.NoticeId}
                    onClick={() => handleRowClick(item.Notice.NoticeId ?? "")} // 클릭 시 해당 행으로 이동
                    className="cursor-pointer hover:bg-gray-100" // 클릭 시 배경색 변경
                  >
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.Notice.NoticeId}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.Notice.title}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.Notice.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-2">
              <LastButton
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => {
                  navigate(
                    GateWayNumber.Manager + "/" + ManagerGateWayType.Advice
                  );
                }}
              >
                후기 추가
              </LastButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
