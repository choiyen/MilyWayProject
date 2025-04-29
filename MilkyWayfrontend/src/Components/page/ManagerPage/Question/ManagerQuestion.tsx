import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기

import { Fontname, ImgTag, LastButton } from "@/SCSS/Fixed";
import plus from "@/Components/Common/assets/plus.png";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { useDispatch } from "react-redux";
import { QuestionDummy, QuestionType } from "@/types/Feature/Question/Question";
import { setQuestionData } from "@/config/request/ReduxList/QuestionsReducer";
import { DELETE, POST } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { useNavigate } from "react-router-dom";
import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { getQuestion } from "./api/util";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures space between content */
  align-items: center;
  padding-top: 50px; /* Space at the top */
  padding-bottom: 50px; /* Space at the bottom */
  overflow-y: auto; /* Scroll only within the MainBox */
`;

const Wapper = styled.div`
  width: auto;
  background-color: #d3f8ff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Ensure all elements are top-aligned */
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  flex-grow: 1; /* Allow Wapper to take remaining space */
  margin-bottom: 50px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

export const ManagerQuestion = () => {
  const [count, setCount] = useState(1);
  const [Question, SetQuestion] = useState<string[]>([]);
  const [Comment, SetComment] = useState<string[]>([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const questionData: QuestionType[] = [];
  const dispatch = useDispatch();
  const cleanCount = () => {
    setCount(count + 1);
  };
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      questionData.push({
        ExpectionQnA: Question[i],
        ExpectedComment: Comment[i],
      });
    }
    dispatch(setQuestionData(questionData));
  }, [Comment, Question, count, dispatch, questionData]);

  const handleQuestion = async () => {
    await DELETE({
      url: paths.Question.basic.path,
    })
      .then(async (res) => {
        if (res.data === "삭제 완료!") {
          console.log("삭제 완료! Question List 재등록 작업 시작");

          try {
            for (let i = 0; i < Question.length; i++) {
              const postRes = await POST({
                url: paths.Question.basic.path,
                data: {
                  ExpectionQnA: Question[i],
                  ExpectedComment: Comment[i],
                },
              });

              if (postRes.data !== "데이터 작성!") {
                throw new Error(`질문 ${i + 1} 등록 실패`);
              }
            }

            console.log("질문 Q&A 변경 작업 완료!");
            navigate(GateWayNumber.Manager + "/" + ManagerGateWayType.Question);
          } catch (err) {
            console.error("재등록 중 에러:", err);
            console.log("일부 질문 등록에 실패했습니다. 다시 시도해주세요.");
          }
        } else {
          console.log("삭제에 실패했습니다. 작업을 중단합니다.");
        }
      })
      .catch((err) => {
        console.error("삭제 요청 실패:", err);
        console.log("삭제 요청에 실패했습니다. 네트워크 상태를 확인해주세요.");
      });
  };
  const lastQuestion = (
    questionDataRef: string[],
    CommentDataRef: string[]
  ) => {
    SetQuestion([...questionDataRef, ""]);
    SetComment([...CommentDataRef, ""]);
    setCount(questionDataRef.length + 1);
  };
  useEffect(() => {
    const questionDataRef: string[] = [];
    const CommentDataRef: string[] = [];
    QuestionDummy.forEach((data) => {
      questionDataRef.push(data.ExpectionQnA);
      CommentDataRef.push(data.ExpectedComment);
    });
    SetQuestion(questionDataRef);
    SetComment(CommentDataRef);
    lastQuestion(questionDataRef, CommentDataRef);
  }, []);

  return (
    <div>
      <MainWapper>
        <MainBox>
          <Fontname> Q&A 관리</Fontname>
          <Wapper>
            {[...Array(count)].map((_, i) => (
              <div
                key={i}
                ref={i === count - 1 ? lastItemRef : null}
                style={{ gap: "20px" }}
              >
                <InputTextBox
                  name={"Q&A 질문 (" + (i + 1) + ")"}
                  place={"예상 질문을 입력해주세요."}
                  Value={Question}
                  setValue={SetQuestion}
                  index={i}
                ></InputTextBox>
                <TextAreaBox
                  name={"Q&A 내용 (" + (i + 1) + ")"}
                  place={"질문에 대한 내용을 입력해주세요"}
                  Value={Comment}
                  setValue={SetComment}
                  index={i}
                ></TextAreaBox>
              </div>
            ))}
            <ImgTag src={plus} onClick={cleanCount} />
          </Wapper>
        </MainBox>
        <LastButton onClick={handleQuestion}> 재업로드</LastButton>
      </MainWapper>
    </div>
  );
};
