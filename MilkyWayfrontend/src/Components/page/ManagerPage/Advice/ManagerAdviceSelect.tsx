import { useEffect, useState } from "react";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { paths } from "@/config/paths/paths";
import { DELETE, POST } from "@/config/request/axios/axiosInstance";
import { NoticeType } from "@/types/Feature/Notice/NoticeAll";
import styled from "styled-components";

const DeleteButton = styled.button`
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
        console.log(res.data);

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
        } else {
          console.warn("Unexpected data format:", res.data);
        }
      } catch (error) {
        console.error("Failed to fetch advice data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (noticeId: string) => {
    navigate(GateWayNumber.Manager + `/editNotice/${noticeId}`);
  };

  const handleDeleteClick = (noticeId: string) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      DELETE({
        url: paths.Notice.basic.path,
        params: {
          noticeId: noticeId,
        },
      })
        .then((res) => {
          if (res.resultType === "success") {
            alert("삭제 완료");
            setAdvicedummy((prev) =>
              prev.filter((item) => item.noticeId !== noticeId)
            );
          } else {
            alert("삭제 실패");
          }
        })
        .catch((error) => {
          console.error("Error deleting advice:", error);
          alert("삭제 실패");
        });
    }
  };

  return (
    <div className="m-0 h-70">
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <Fontname>온라인 후기 관리</Fontname>
        <div className="w-9/12 flex flex-col px-4 py-4 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full mx-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">관리번호</th>
                  <th className="px-6 py-3 text-left">제목</th>
                  <th className="px-6 py-3 text-left">청소유형</th>
                  <th className="px-6 py-3 text-left">삭제</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm">
                {Advicedummy.length > 0 ? (
                  Advicedummy.map((item, index) => (
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
                      <td className="border px-6 py-3 whitespace-nowrap text-center">
                        <DeleteButton
                          onClick={(e) => {
                            e.stopPropagation(); // ✅ 행 클릭 이벤트 전파 막기
                            handleDeleteClick(item.noticeId ?? "");
                          }}
                        >
                          🗑 삭제
                        </DeleteButton>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-10 text-blue-600 font-bold text-lg border-t"
                    >
                      관리해야 할 온라인 후기가 없습니다.
                    </td>
                  </tr>
                )}
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
