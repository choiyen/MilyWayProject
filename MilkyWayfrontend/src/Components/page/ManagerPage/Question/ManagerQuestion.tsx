import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기

import { Fontname, ImgTag, LastButton } from "@/SCSS/Fixed";
import plus from "@/Components/Common/assets/plus.png";
import { TextAreaBox } from "@/Components/Common/ui/TextArea/TextAreaBox";
import { InputTextBox } from "@/Components/Common/ui/Input/InputTextBox";
import { useDispatch, useSelector } from "react-redux";
import { setQuestionData } from "@/config/request/ReduxList/QuestionsReducer";
import { PostQuestionALL } from "./api/util";
import { RootState } from "@/config/reduxstore";
import { POST, PUT } from "@/config/request/axios/axiosInstance";
import { paths } from "@/config/paths/paths";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

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
  const QuestionDatas = useSelector((state: RootState) => state.Question.value);
  const [count, setCount] = useState(QuestionDatas.length);
  const [Question, SetQuestion] = useState<string[]>([]);
  const [Comment, SetComment] = useState<string[]>([]);
  const [id, SetID] = useState<number[]>([]);

  const dispatch = useDispatch();
  const cleanCount = () => {
    setCount(count + 1);
  };
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    PostQuestionALL().then((res) => {
      if (res.resultType === "findnot") {
        toast.error(
          "현재 데이터베이스에 Q&A 정보가 없습니다. 새로운 정보를 추가해주세요.",
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
      } else if (res.resultType === "success") {
        const newQuestions: string[] = [];
        const newComments: string[] = [];
        const newID: number[] = [];
        for (let i = 0; i < res.data.length; i++) {
          newQuestions.push(res.data[i].exceptionQA);
          newComments.push(res.data[i].expectedComment);
          newID.push(res.data[i].id);
        }

        SetQuestion(newQuestions);
        SetComment(newComments);
        SetID(newID);

        const combinedData = newQuestions.map((q, idx) => ({
          id: newID[idx],
          exceptionQA: q,
          expectedComment: newComments[idx],
        }));
        dispatch(setQuestionData(combinedData));
        setCount(combinedData.length);
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const combinedData = Question.map((q, idx) => ({
      exceptionQA: q,
      expectedComment: Comment[idx],
      id: id[idx],
    }));
    dispatch(setQuestionData(combinedData));
  }, [Comment, Question, dispatch]);

  const handleQuestion = () => {
    try {
      PostQuestionALL().then(async (res) => {
        if (res.resultType === "findnot") {
          for (let i = 0; i < QuestionDatas.length; i++) {
            await POST({
              url: paths.Question.basic.path,
              data: {
                exceptionQA: QuestionDatas[i].exceptionQA,
                expectedComment: QuestionDatas[i].expectedComment,
              },
            });
          }
          Swal.fire({
            icon: "success",
            title: "Q&A 정보 등록 완료",
            text: "Q&A 정보가 성공적으로 등록되었습니다.",
            confirmButtonText: "확인",
          });
        } else if (res.resultType === "success") {
          const newOrUpdatedList = QuestionDatas.filter((q) => {
            const match = res.data.find(
              (e: {
                id: number;
                exceptionQA: string;
                expectedComment: string;
              }) => e.id === q.id
            );

            // 신규 데이터 (id 없음) → 추가
            if (!q.id) return true;

            // id는 같지만 내용이 다르면 → 수정 대상
            if (
              match &&
              (match.exceptionQA !== q.exceptionQA ||
                match.expectedComment !== q.expectedComment)
            ) {
              return true;
            }

            // 그 외는 기존과 동일 → 제외
            return false;
          });
          for (const DataList of newOrUpdatedList) {
            if (!DataList.id) {
              // 신규 데이터 → POST
              await POST({
                url: paths.Question.basic.path,
                data: {
                  exceptionQA: DataList.exceptionQA,
                  expectedComment: DataList.expectedComment,
                },
              });
            } else {
              // 수정된 데이터 → PUT
              await PUT({
                url: paths.Question.basic.path,
                data: {
                  id: DataList.id,
                  exceptionQA: DataList.exceptionQA,
                  expectedComment: DataList.expectedComment,
                },
              });
            }
          }
          Swal.fire({
            icon: "success",
            title: "Q&A 정보 수정 완료",
            text: "Q&A 정보가 성공적으로 수정되었습니다.",
            confirmButtonText: "확인",
          });
        }
      });
    } catch (error) {
      console.error("Failed to handle question:", error);
      Swal.fire({
        icon: "error",
        title: "오류 발생",
        text: "Q&A 정보를 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.",
        confirmButtonText: "확인",
      });
    }
  };
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
