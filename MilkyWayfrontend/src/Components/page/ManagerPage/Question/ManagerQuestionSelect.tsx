import { Fontname, LastButton } from "@/SCSS/Fixed";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import "@/SCSS/tailwind.scss";
import { useNavigate } from "react-router-dom";
import { QuestionType } from "@/types/Feature/Question/Question";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { PostQuestionALL } from "./api/util";

// 메인 wrapper
const MainWapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    width: 100vw;
    padding: 10px;
    background-color: transparent;
    box-shadow: none;
    border-radius: 0px;
  }
`;

const MainBox = styled.div`
  width: 100%;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 50px;
  overflow-y: auto;
`;

export const ManagerQuestionSelect = () => {
  const [QuestionDummys, SetQuestionDummy] = useState<QuestionType[] | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    PostQuestionALL().then((res) => {
      SetQuestionDummy(res.data);
    });
  }, []);

  const QuestionButtonClick = (path: string) => {
    navigate(path);
  };

  return (
    <MainBox>
      <MainWapper>
        <Fontname>Q & A 관리</Fontname>

        {/* ✅ 데스크탑 전용 테이블 */}
        <div className="w-full px-4 overflow-x-auto py-10 hidden sm:block">
          <div className="min-w-full flex justify-center">
            <table className="table-auto w-full sm:min-w-[600px] border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
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
                          className={`border px-4 py-2 align-top break-words whitespace-normal max-w-xs ${
                            isLast ? "rounded-bl-lg" : ""
                          }`}
                        >
                          {data.exceptionQA}
                        </td>
                        <td
                          className={`border px-4 py-2 align-top break-words whitespace-normal max-w-md ${
                            isLast ? "rounded-br-lg" : ""
                          }`}
                          title={data.expectedComment}
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
                      className="text-center py-10 text-blue-600 font-bold text-sm sm:text-lg border-t"
                    >
                      고객 예상 Q&A는 등록되지 않았습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ✅ 모바일 전용 카드 */}
        <div className="w-full px-4 py-10 sm:hidden flex flex-col gap-4">
          {QuestionDummys && QuestionDummys.length > 0 ? (
            QuestionDummys.map((data) => (
              <div
                key={data.id}
                className="bg-white rounded-lg shadow-md p-4 border"
              >
                <table className="w-full text-sm table-fixed">
                  <tbody>
                    <tr className="border-b">
                      <th className="text-left text-blue-600 font-semibold pr-2 w-16 align-top">
                        제목
                      </th>
                      <td className="break-words text-gray-800">
                        {data.exceptionQA}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left text-blue-600 font-semibold pr-2 align-top">
                        내용
                      </th>
                      <td className="break-words whitespace-pre-wrap text-gray-700">
                        {data.expectedComment}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))
          ) : (
            <p className="text-blue-600 font-bold text-sm text-center">
              고객 예상 Q&A는 등록되지 않았습니다.
            </p>
          )}
        </div>

        {/* 버튼 */}
        <LastButton
          className="mt-6 w-full max-w-xs sm:max-w-md"
          onClick={() =>
            QuestionButtonClick(
              GateWayNumber.Manager + "/" + ManagerGateWayType.Question
            )
          }
        >
          예상 질문 추가
        </LastButton>
      </MainWapper>
    </MainBox>
  );
};
