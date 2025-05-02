import { useEffect, useState } from "react";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { NoticeType } from "@/types/Feature/Notice/NoticeAll";

export const ManagerAdviceSelect = () => {
  const [Advicedummy, setAdvicedummy] = useState<NoticeType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await POST({
          url: paths.Notice.serach.path,
        });

        // ✅ 중복 방지를 위해 지역 변수로 선언
        const Notice: NoticeType[] = [];

        if (Array.isArray(res.data[0])) {
          for (let i = 0; i < res.data[0].length; i++) {
            Notice.push({
              noticeId: res.data[0][i].noticeId,
              title: res.data[0][i].title,
              type: res.data[0][i].type,
              titleimg: "",
              greeting: "",
            });
          }
          setAdvicedummy(Notice); // 상태 업데이트
        } else {
          console.warn("Unexpected data format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch advice data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Advicedummy", Advicedummy);
  }, [Advicedummy]);

  const handleRowClick = (noticeId: string) => {
    navigate(GateWayNumber.Manager + `/editNotice/${noticeId}`);
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
                {Advicedummy.map((item, index) => (
                  <tr
                    key={item.noticeId}
                    onClick={() => handleRowClick(item.noticeId ?? "")}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="border px-6 py-3 whitespace-nowrap">
                      {item.type}
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
