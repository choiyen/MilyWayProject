import { paths } from "@/config/paths/paths";
import { GET } from "@/config/request/axios/axiosInstance";
import { Fontname } from "@/SCSS/Fixed";
import "@/SCSS/tailwind.scss";
import { GateWayNumber } from "@/types/GateWay/GateWayType";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface InqurieResponse {
  inquireId: string;
  inquirename: string;
  inquire: string;
  dateOfInquiry: string;
  inquireBool: boolean;
  phoneNumber: string;
  address: string;
}

const ManagerInquires = () => {
  // 이 컴포넌트는 관리자 문의 페이지를 렌더링합니다.
  const [inquiries, setInquiries] = useState<InqurieResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const nativeGate = useNavigate();
  const handeInquiryGET = async (page: number) => {
    return await GET({
      url: paths.Inqurie.serach.page.path,
      params: { page: page },
    });
  };

  useEffect(() => {
    // 페이지가 로드될 때 필요한 초기화 작업을 수행할 수 있습니다.
    // 예: API 호출, 상태 초기화 등
    handeInquiryGET(currentPage)
      .then((res) => {
        if (res.resultType === "success") {
          // 문의 데이터를 성공적으로 가져온 경우 상태를 업데이트합니다.
          // console.log("문의 데이터:", res.pageDTO.list);

          for (const inquiry of res.pageDTO.list) {
            console.log("문의 데이터:", inquiry);
            // inquiries 배열에 새로운 문의 데이터를 추가합니다.
            // setInquiries((prev) => [...prev, inquiry]);
            setInquiries((prev) => {
              if (prev) {
                return [...prev, inquiry];
              } else {
                return [inquiry];
              }
            });
          }
          setInquiries(res.pageDTO.list);
          setTotalPages(res.pageDTO.pageCount);
        } else {
          toast.error(
            "문의 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
            {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      })
      .catch((err) => {
        toast.error(
          "문의 데이터를 가져오는 중 오류가 발생했습니다. 다시 시도해주세요." +
            err,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  }, [currentPage]);

  const handlePageChange = (inquireid: string) => {
    // 데이터 확인 후 페이지를 변경합니다.
    console.log("문의 ID:", inquireid);
    nativeGate(
      GateWayNumber.Manager + "/" + `editInquire/${inquireid}` // 문의 상세 페이지로 이동
    );
  };

  return (
    <div className="flex flex-col items-center h-full gap-10">
      <Fontname> 고객 문의 </Fontname>
      <div className="text-gray-600 text-lg mt-4">
        고객님들의 문의사항을 확인하고 관리하세요.
      </div>
      <table>
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">번호</th>
            <th className="px-4 py-2 text-left">이름</th>
            <th className="px-4 py-2 text-left">주소</th>
            <th className="px-4 py-2 text-left">날짜</th>
            <th className="px-4 py-2 text-left">상태</th>
            <th className="px-4 py-2 text-left">전화번호</th>
            <th className="px-4 py-2 text-left">응답확인</th>
          </tr>
        </thead>
        <tbody>
          {/* 여기에 문의 데이터가 들어갑니다. */}
          {/* 예시 데이터 */}
          {inquiries && inquiries.length > 0 ? (
            inquiries.map((inquiry, index) => {
              console.log("문의 데이터ddddd:", inquiry);
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{inquiry.inquirename}</td>
                  <td className="px-4 py-2">{inquiry.address}</td>
                  <td className="px-4 py-2">{inquiry.dateOfInquiry}</td>
                  <td
                    className={`px-4 py-2 ${
                      inquiry.inquireBool ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {inquiry.inquireBool ? "확인" : "미확인"}
                  </td>
                  <td className="px-4 py-2">{inquiry.phoneNumber}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        // 문의 응답 확인 로직을 여기에 추가합니다.
                        // 예: API 호출, 상태 업데이트
                        handlePageChange(inquiry.inquireId);
                        // 페이지 변경 함수 호출
                      }}
                    >
                      {/* 문의 응답 확인 버튼 */}
                      확인
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="text-center px-4 py-2">
                문의 데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`px-5 py-2 rounded-md font-semibold transition-colors ${
            currentPage === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          이전
        </button>

        <div
          style={{
            width: "40px",
            height: "40px",
            lineHeight: "40px", // 세로 중앙 정렬용
            textAlign: "center",
            fontWeight: "700",
            fontSize: "1.25rem",
            borderRadius: "50%",
            backgroundColor: "#1f2937", // 배경색 넣으면 더 잘 보임
            color: "white",
            userSelect: "none",
          }}
        >
          {currentPage + 1}
        </div>

        <button
          onClick={() => {
            if (currentPage >= totalPages - 1) {
              toast.error("마지막 페이지입니다.", {
                position: "top-center",
                autoClose: 3000,
              });
              return;
            }
            setCurrentPage(currentPage + 1);
          }}
          className={`px-5 py-2 rounded-md font-semibold transition-colors ${
            currentPage >= totalPages - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          다음
        </button>
      </div>
    </div>
  );
};
export default ManagerInquires;
