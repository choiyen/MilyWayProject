import { paths } from "@/config/paths/paths";
import { POST } from "@/config/request/axios/axiosInstance";
import { Fontname } from "@/SCSS/Fixed";
import "@/SCSS/tailwind.scss";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ManagerInquires = () => {
  // 이 컴포넌트는 관리자 문의 페이지를 렌더링합니다.
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const handeInquiryGET = async (page: number) => {
    return await POST({
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
          setInquiries(res.data);
        } else {
          toast.error(
            "문의 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.",
            {
              position: "top-right",
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
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      });
  }, []);

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
            <th className="px-4 py-2 text-left">문의 내용</th>
            <th className="px-4 py-2 text-left">상태</th>
            <th className="px-4 py-2 text-left">날짜</th>
            <th className="px-4 py-2 text-left">응답확인</th>
          </tr>
        </thead>
        <tbody>
          {/* 여기에 문의 데이터가 들어갑니다. */}
          {/* 예시 데이터 */}
          <tr>
            <td className="px-4 py-2">1</td>
            <td className="px-4 py-2">홍길동</td>
            <td className="px-4 py-2">청소 예약 문의</td>
            <td className="px-4 py-2">답변 대기 중</td>
            <td className="px-4 py-2">2023-10-01</td>
            <td className="px-4 py-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                확인
              </button>
            </td>
          </tr>
          {/* 추가 문의 데이터는 여기에 작성하세요. */}
        </tbody>
      </table>
    </div>
  );
};
export default ManagerInquires;
