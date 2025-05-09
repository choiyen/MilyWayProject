import { QuestionType } from "@/types/Feature/Question/Question";
import { useState } from "react";
import styled from "styled-components";

// Q&A 본문 박스
const QuestionBox = styled.div`
  width: 100%;
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b3e5fc; /* 연한 하늘 */
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
`;

const QuestionBoxTitle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "visible", // DOM으로 전달 막기
})<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "flex" : "none")};
  background-color: #279acf;
  font-size: 18px;
  width: 50vw;
  padding: 50px;
  border-radius: 0px 0px 10px 10px;
  margin-bottom: 20px;
  border: 1px solid #000000;
`;

interface ExampleQuestionProps {
  Question: QuestionType[] | null;
}

export const ExampleQuestion = ({ Question }: ExampleQuestionProps) => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (title: string | number) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <>
      <QuestionBox>
        <QuestionTitle>Question & Answer</QuestionTitle>
        {Question &&
          Question.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  backgroundColor: "#e0f7fa",
                  borderRadius: "10px 10px 0px 0px",
                  padding: "10px",
                  width: "50vw",
                }}
                onClick={() => handleToggle(item.exceptionQA)}
              >
                <strong>{item.exceptionQA}</strong>
              </div>
              <QuestionBoxTitle visible={!!openItems[item.exceptionQA]}>
                <p>{item.expectedComment}</p>
              </QuestionBoxTitle>
            </div>
          ))}
      </QuestionBox>
    </>
  );
};
