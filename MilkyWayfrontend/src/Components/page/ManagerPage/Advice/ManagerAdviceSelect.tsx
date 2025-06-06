import { Key, useEffect, useState } from "react";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { Fontname, LastButton } from "@/SCSS/Fixed";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { paths } from "@/config/paths/paths";
import { DELETE, POST } from "@/config/request/axios/axiosInstance";
import { NoticeType } from "@/types/Feature/Notice/NoticeAll";
import styled from "styled-components";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Card, CardList, CardRow, ResponsiveText } from "@/types/CardType/Card";

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
        const Notice: NoticeType[] = [];

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
          Swal.fire({
            icon: "warning",
            title: "데이터 오류",
            text: "후기 데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.",
            confirmButtonText: "확인",
          });
        }
      } catch (error) {
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
            Swal.fire({
              icon: "success",
              title: "삭제 완료",
              text: "후기가 성공적으로 삭제되었습니다.",
              confirmButtonText: "확인",
            });
            setAdvicedummy((prev) =>
              prev.filter((item) => item.noticeId !== noticeId)
            );
          } else {
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

  return (
    <div className="m-0 h-70">
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <Fontname>온라인 후기 관리</Fontname>
        <div className="w-9/12 flex flex-col px-4 py-4 overflow-y-auto">
          <div className="flex flex-col gap-4 w-full mx-auto">
            {isMobile ? (
              <div className="text-center text-gray-500 mb-4">
                <CardList>
                  {Advicedummy && Advicedummy.length !== 0 ? (
                    Advicedummy.map((date: NoticeType, index: Key) => (
                      <Card
                        key={index}
                        onClick={() => handleRowClick(date.noticeId ?? "")}
                      >
                        <CardRow>
                          <span className="label">번호</span>
                          <span className="value">{Number(index) + 1}</span>
                        </CardRow>
                        <CardRow>
                          <span className="label">제목</span>
                          <span className="value">{date.title}</span>
                        </CardRow>
                        <DeleteButton
                          onClick={(e: { stopPropagation: () => void }) => {
                            e.stopPropagation(); // ✅ 행 클릭 이벤트 전파 막기
                            handleDeleteClick(date.noticeId ?? "");
                          }}
                        >
                          삭제
                        </DeleteButton>
                      </Card>
                    ))
                  ) : (
                    <ResponsiveText>
                      <div>최근 한달에 해당하는 데이터가 없습니다.</div>
                    </ResponsiveText>
                  )}
                </CardList>
              </div>
            ) : (
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
                            onClick={(e: { stopPropagation: () => void }) => {
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
            )}

            {TotalPage.current > 0 && (
              <div className="flex justify-center mt-3">
                <div className="flex items-center space-x-6 gap-10">
                  <div className="flex items-center space-x-2 gap-5">
                    <button
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                      aria-label="이전 페이지"
                      onClick={() => {
                        if (currentPage <= 0) {
                          toast.error("첫 페이지입니다.", {
                            position: "top-center",
                          });
                          return;
                        }
                        setcurrentPage(currentPage - 1);
                        setrefreshKey(!refreshKey);
                      }}
                    >
                      &lt;
                    </button>
                    {Array.from({ length: TotalPage.current }, (_, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 rounded-md bg-white border border-gray-300 hover:bg-blue-100 focus:outline-none"
                        onClick={() => {
                          setcurrentPage(index);
                          setrefreshKey(!refreshKey);
                        }}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none"
                      aria-label="다음 페이지"
                      onClick={() => {
                        if (currentPage + 1 < TotalPage.current) {
                          setcurrentPage(currentPage + 1);
                          setrefreshKey(!refreshKey);
                        } else {
                          toast.error("마지막 페이지입니다.", {
                            position: "top-center",
                          });
                        }
                      }}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            )}
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
