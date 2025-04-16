import { useEffect } from "react";
import { useState } from "react";
import { NoticeFullType } from "@/types/ProjectDataType";
import { NoticeFulldummy } from "@/types/MemberDummydate";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FixedManagerHeader } from "@/SCSS/Fixed";
import { Footer } from "@/Components/Common/Footer";

const Warning = styled.div`
  color: red;
  font-size: 14px;
  font-weight: bold;
`;

export const ManagerAdviceInsert = () => {
  const [Advicedummy, setAdvicedummy] = useState<NoticeFullType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAdvicedummy(NoticeFulldummy);
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <FixedManagerHeader />
      <div className="bg-white w-full h-[calc(60vh-30px)] flex flex-col justify-between items-center px-4 py-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">온라인 예약 관리</h1>
        <Warning>
          세부 정보를 확인하시려면 고객용 페이지에서 확인하세요
          <span className="text-blue-500 mb-4">(삭제 기능만 지원)</span>
        </Warning>
        <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
              <tr>
                <th className="px-4 py-2">관리번호</th>
                <th className="px-4 py-2">제목</th>
                <th className="px-4 py-2">작성자</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {Advicedummy.map((item) => (
                <tr key={item.Notice.NoticeId}>
                  <td className="border px-4 py-2">{item.Notice.NoticeId}</td>
                  <td className="border px-4 py-2">{item.Notice.greeting}</td>
                  <td className="border px-4 py-2">{item.Notice.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => {
              navigate("./ManagerAdvice");
            }}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};
