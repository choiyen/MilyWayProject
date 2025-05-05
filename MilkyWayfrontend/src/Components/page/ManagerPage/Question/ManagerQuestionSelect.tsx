import { Fontname, LastButton } from "@/SCSS/Fixed";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { QuestionType } from "@/types/Feature/Question/Question";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { PostQuestionALL } from "./api/util";

// 페이지 전체 wrapper - 화면 꽉 차게 하면서도 내용에 따라 유연하게
const MainWapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const MainBox = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures space between content */
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

export const ManagerQuestionSelect = () => {
  const [QuestionDummys, SetQuestionDummy] = useState<QuestionType[] | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    // 더미 데이터 세팅 (API로 대체 가능)

    PostQuestionALL().then((res) => {
      SetQuestionDummy(res.data);
    });
  }, []);

  const QuestionButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <MainBox>
        <MainWapper>
          <Fontname>Q & A 관리</Fontname>
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
                {QuestionDummys && QuestionDummys.length > 0 ? (
                  QuestionDummys.map((data, idx) => {
                    const isLast = QuestionDummys.length - 1 === idx;
                    return (
                      <tr key={data.id} className="hover:bg-slate-100">
                        <td
                          className={`border px-4 py-2 align-top break-words max-w-xs ${
                            isLast ? "rounded-bl-lg" : ""
                          }`}
                        >
                          {data.exceptionQA}
                        </td>
                        <td
                          className={`border px-4 py-2 align-top break-words max-w-md truncate ${
                            isLast ? "rounded-br-lg" : ""
                          }`}
                          title={data.expectedComment}
                          style={{
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            wordWrap: "break-word",
                          }}
                        >
                          {data.expectedComment}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="text-center py-10 text-blue-600 font-bold text-lg border-t"
                    >
                      고객 예상 Q&A는 등록되지 않았습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* 버튼 */}
            <LastButton
              onClick={() =>
                QuestionButtonClick(
                  GateWayNumber.Manager + "/" + ManagerGateWayType.Question
                )
              }
            >
              예상 질문 추가
            </LastButton>
          </div>
        </MainWapper>
      </MainBox>
    </>
  );
};
