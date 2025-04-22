import { Footer } from "@/Components/Common/Footer";
import { FixedManagerHeader, Fontname, LastButton } from "@/SCSS/Fixed";
import { QuestionDummy } from "@/types/ManagerDummydata";
import { QuestionType } from "@/types/ProjectDataType";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { GateWayType } from "@/types/GateWayType";

// 페이지 전체 wrapper - 화면 꽉 차게 하면서도 내용에 따라 유연하게
const MainWapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: blanchedalmond;
`;

export const ManagerQuestionSelect = () => {
  const [QuestionDummys, SetQuestionDummy] = useState<QuestionType[] | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 데이터 세팅 (API로 대체 가능)
    SetQuestionDummy(QuestionDummy);
  }, []);

  const QuestionButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <FixedManagerHeader />
      <MainWapper>
        <Fontname>후기 관리</Fontname>
        {/* 테이블 섹션 */}
        <div className="w-full px-4 overflow-x-auto flex flex-col items-center py-10">
          <table className="table-auto border-collapse bg-white shadow-lg min-w-[600px] rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-slate-300">
                <th className="border px-4 py-2 w-1/3 rounded-tl-lg">제목</th>
                <th className="border px-4 py-2 w-2/3 rounded-tr-lg">내용</th>
              </tr>
            </thead>
            <tbody>
              {QuestionDummys?.map((data, idx) => {
                const isLast = QuestionDummys.length - 1 === idx;
                return (
                  <tr key={data.questionId} className="hover:bg-slate-100">
                    <td
                      className={`border px-4 py-2 align-top break-words max-w-xs ${
                        isLast ? "rounded-bl-lg" : ""
                      }`}
                    >
                      {data.ExpectionQnA}
                    </td>
                    <td
                      className={`border px-4 py-2 align-top break-words max-w-md truncate ${
                        isLast ? "rounded-br-lg" : ""
                      }`}
                      title={data.ExpectedComment}
                    >
                      {data.ExpectedComment}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* 버튼 */}
          <LastButton
            onClick={() => QuestionButtonClick(GateWayType.ManagerQuestion)}
          >
            예상 질문 추가
          </LastButton>
        </div>
      </MainWapper>
      <Footer />
    </>
  );
};
