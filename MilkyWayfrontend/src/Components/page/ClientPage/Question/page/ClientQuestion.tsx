// ClientQuestion.tsx
import styled from "styled-components";
import { FaRegQuestionCircle } from "react-icons/fa";
import { QuestionDummy, QuestionType } from "@/types/Feature/Question/Question";
import { useEffect, useState } from "react";
import { PostQuestionALL } from "@/Components/page/ManagerPage/Question/api/util";
import { useDispatch } from "react-redux";
import { setQuestionData } from "@/config/request/ReduxList/QuestionsReducer";
import { ExampleQuestion } from "./ui/ExampleQuestion";
import CommentQuestion from "./ui/CommentQuestion";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";

// 페이지 전체 컨테이너
const PageContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
`;

// 상단 Q&A 배너
const QuestionCampaign = styled.div`
  width: 100%;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffb794; /* 연한 살구 */
  padding: 30px 20px;
`;

// 타이틀 (아이콘 포함)
const QuestionTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 38px;
  font-weight: 700;
  color: whitesmoke;
  margin-bottom: 42px;
  margin-top: 50px;
  gap: 10px;
  @media screen and (max-width: 600px) {
    font-size: 25px;
    margin-bottom: 25px;
    margin-top: 30px;
  }
`;

// 설명 텍스트
const QuestionSubtitle = styled.div`
  color: blanchedalmond;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  max-width: 80%;
  line-height: 1.4;
`;

// 선 긋기
const Divider = styled.hr`
  border: none;
  height: 2px;
  width: 50%;
  background-color: black;
  margin: 12px 0;
`;

export const ClientQuestion = () => {
  const [Question, setQuestion] = useState<QuestionType[] | null>(
    QuestionDummy
  );
  const dispatch = useDispatch();
  useEffect(() => {
    PostQuestionALL().then((res) => {
      if (res.resultType === "findnot") {
        console.log("질문 데이터가 없습니다.");
      } else if (res.resultType === "success") {
        const newQuestions: QuestionType[] = [];
        for (let i = 0; i < res.data.length; i++) {
          newQuestions.push({
            id: res.data[i].id,
            exceptionQA: res.data[i].exceptionQA,
            expectedComment: res.data[i].expectedComment,
          });
        }
        setQuestion(newQuestions);
        dispatch(setQuestionData(newQuestions));
      }
    });
  }, [dispatch]);

  const width = useWindowWidth();
  const isMobile = width <= 600;

  return (
    <PageContainer>
      <QuestionCampaign>
        <QuestionTitle>
          <FaRegQuestionCircle size={28} />
          청소 작업!! 궁금하신가요?
        </QuestionTitle>
        <Divider />
        <QuestionSubtitle>
          {isMobile
            ? "고객님들이 자주 물어보셨어요 😊"
            : "고객분들께서 자주 물어보는 질문을 정리해드렸어요 😊"}
        </QuestionSubtitle>
      </QuestionCampaign>
      <ExampleQuestion Question={Question} />
      <CommentQuestion />
    </PageContainer>
  );
};
