import { cleanType } from "@/types/cleanspace/cleanType";
import styled from "styled-components";
import { InquireText } from "./Component/InquireText";
import { FaFeatherAlt, FaHandsWash, FaStar } from "react-icons/fa";
import { BlogComment } from "./Component/BlogComment";
import { ImageGrid } from "./Component/ImageGrid";
import { useNavigate } from "react-router-dom";
import { ClientGateWayType, GateWayNumber } from "@/types/GateWay/GateWayType";

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
const CleanButton = styled.button`
  width: 100px;
  height: 10vh;
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cceeff; /* 밝고 청결한 느낌의 하늘색 배경 */
  }
  &:active {
    background-color: #a6d5f7; /* 밝은 하늘색 */
  }

  &:focus {
    box-shadow: 0 0 0 2px #0eeab6; // 포커스 시 민트색 테두리
  }
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
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
  const native = useNavigate();
  const handleClickSerive = (data: string) => {
    native(
      GateWayNumber.Client + "/" + ClientGateWayType.Service + `?type=${data}`
    );
  };
  const handleClickQA = () => {
    native(GateWayNumber.Client + "/" + ClientGateWayType.Question);
  };
  const businessPhoneNumber = import.meta.env.VITE_APP_BUSINESS_PHONE_NUMBER;

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
            <CleanButton key={index} onClick={() => handleClickSerive(data)}>
              {data}
            </CleanButton>
          ))}
        </ButtonMapper>
        <div
          style={{
            display: "flex",
            textAlign: "center",
            alignItems: "stretch", // 두 영역 높이 맞춤
          }}
        >
          {/* 전화 걸기 영역 전체 클릭 가능 */}
          <a
            href={`tel:${businessPhoneNumber}`}
            target="_blank"
            style={{
              flex: 1,
              textDecoration: "none",
              color: "inherit",
              display: "block", // block으로 만들어야 flex 작동
            }}
          >
            <div
              style={{
                backgroundColor: "#fff9db",
                height: "15vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                flexDirection: "column",
                paddingLeft: "16px",
                gap: "6px",
                cursor: "pointer",
                boxShadow: "4px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "#305f55",
                }}
              >
                상담전화 걸기
              </span>
              <span style={{ fontSize: "1rem", color: "#a5947c" }}>
                휴대전화에서 클릭 시 바로 연결
              </span>
            </div>
          </a>

          {/* Q&A 영역 */}
          <div
            style={{
              flex: 1,
              backgroundColor: "#ffe6e1",
              height: "15vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              flexDirection: "column",
              paddingBottom: "12px",
              cursor: "pointer", // 기본 상태부터 커서를 클릭 가능한 손가락 모양으로 변경
              boxShadow: "4px 4px rgba(0, 0, 0, 0.1)",
            }}
            onClick={() => {
              handleClickQA();
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
        <ImageGrid />
      </AcrosticBox>
    </>
  );
};
