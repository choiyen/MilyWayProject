import { cleanType } from "@/types/cleanspace/cleanType";
import styled from "styled-components";
import { InquireText } from "./Component/InquireText";
import { FaFeatherAlt, FaHandsWash, FaStar } from "react-icons/fa";
import bathsrooms from "@/Components/Common/assets/bathsrooms.png";
import { BlogComment } from "./Component/BlogComment";

export const MainMapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  background-color: #d6e3c9; // 밝고 청결한 느낌의 민트 배경
  height: calc(20vh - 15px);

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #305f55; // 짙은 청록색으로 가독성 확보

    span:first-of-type {
      color: #4da692; // 상쾌한 민트포인트
      font-weight: 600;
    }
  }
`;

export const ButtonMapper = styled.div`
  display: flex;
  flex-wrap: wrap; /* 버튼이 넘치면 다음 줄로 이동 */
  gap: 12px; /* 버튼 사이 간격 */
  padding: 50px;
  background-color: #d6e3c9; // 밝고 청결한 느낌의 민트 배경

  & > button {
    flex: 1 0 21%; /* 한 줄에 4개 배치 (100% / 4 ≈ 25%, gap 빼고 약간 작게) */
    min-width: 0; /* 줄 넘침 방지 */
    width: 100px;
    height: 10vh;
    background-color: aliceblue;
    border: 1px solid black;
    border-radius: 15px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
  }
`;
const AcrosticBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: white; // PowderBlue
`;
const ImageGrid = styled.div`
  display: grid;
  padding: 20px;
  margin-top: 60px;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  justify-items: center;

  img {
    width: 70%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }
`;
export const MainPage = () => {
  const iconStyle = { marginRight: "8px", color: "#4a90e2", minWidth: "20px" };
  const lineStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "1.2rem",
    lineHeight: 1.4,
    color: "#333",
  };
  return (
    <>
      <div>
        <MainMapper>
          <h2>
            <span>하루에 한집씩!</span>
            <span>차근차근!! 꼼꼼히!!</span>
          </h2>
          <div>어떤 업무를 하는 지 궁금하지 않으신가요?</div>
        </MainMapper>
        <ButtonMapper>
          {cleanType.map((data, index) => (
            <button key={index}>{data}</button>
          ))}
        </ButtonMapper>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "#fff9db",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexDirection: "column",
              paddingLeft: "16px",
              gap: "6px",
            }}
          >
            <span style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              상담전화 걸기
            </span>
            <span style={{ fontSize: "1rem", color: "#a5947c" }}>
              휴대전화에서 클릭 시 바로 연결
            </span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: "#ffe6e1",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              paddingBottom: "12px", // 하단 여백 추가
            }}
          >
            <span style={{ fontSize: "1.55rem", fontWeight: "bold" }}>
              Q&A 보기
            </span>
            <span style={{ fontSize: "1rem", color: "#555" }}>
              예상 질문을 작성해봤어요!
            </span>
          </div>
        </div>
        <InquireText />
      </div>
      <AcrosticBox>
        <span style={lineStyle}>
          <FaFeatherAlt style={{ ...iconStyle, marginRight: "8px" }} />
          <strong style={{ color: "#305f55", marginRight: "8px" }}>
            은은하고 깨끗하게
          </strong>{" "}
          잡티 하나 없이
        </span>
        <span style={lineStyle}>
          <FaHandsWash style={{ ...iconStyle, marginRight: "8px" }} />
          <strong style={{ color: "#305f55", marginRight: "8px" }}>
            하나하나 정성스럽게
          </strong>{" "}
          어머니의 손으로
        </span>
        <span style={lineStyle}>
          <FaStar style={{ ...iconStyle, marginRight: "8px" }} />
          <span style={{ color: "#305f55", fontWeight: 600 }}>
            수없이 확인하여 청소하는
          </span>{" "}
          <span
            style={{
              color: "#f19a9a",
              fontWeight: 700,
              fontSize: "1.3rem",
              marginLeft: "6px",
            }}
          >
            은하수 홈케어
          </span>
          를 한번 만나보세요!!!
        </span>
        <BlogComment />
        <ImageGrid>
          <img src={bathsrooms} alt="bathroom" />
          <img src={bathsrooms} alt="bathroom" />
          <img src={bathsrooms} alt="bathroom" />
          <img src={bathsrooms} alt="bathroom" />
          <img src={bathsrooms} alt="bathroom" />
          <img src={bathsrooms} alt="bathroom" />
        </ImageGrid>
      </AcrosticBox>
    </>
  );
};
