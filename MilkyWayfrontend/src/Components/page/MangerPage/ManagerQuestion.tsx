import { useRef, useState } from "react";
import styled from "styled-components";
// 예시: MangerHeader를 named import 방식으로 가져오기
import { MangerHeader } from "@/Components/Common/MangerHeader";
import { Footer } from "@/Components/Common/Footer";
import { Fontname, ImgTag, LastButton } from "@/SCSS/Fixed";
import plus from "@/Components/img/plus.png";
import { TextAreaBox } from "@/Components/Common/TextAreaBox";
import { InputTextBox } from "@/Components/Common/InputTextBox";

const MainWapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  width: 100%;
  height: calc(60vh - 30px); /* Increased height to make space */
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
  height: auto; /* Allow Wapper to grow dynamically */
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

  const cleanCount = () => {
    setCount(count + 1);
  };
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <MangerHeader />
      <MainWapper>
        <MainBox>
          <MainWapper>
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
                  ></InputTextBox>
                  <TextAreaBox
                    name={"Q&A 내용 (" + (i + 1) + ")"}
                    place={"질문에 대한 내용을 입력해주세요"}
                  ></TextAreaBox>
                </div>
              ))}
              <ImgTag src={plus} onClick={cleanCount} />
            </Wapper>
            <LastButton> 재업로드</LastButton>
          </MainWapper>
        </MainBox>
      </MainWapper>
      <Footer />
    </div>
  );
};
