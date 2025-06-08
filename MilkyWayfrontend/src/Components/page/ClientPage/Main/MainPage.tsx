import { cleaning } from "@/types/cleanspace/cleanType";
import styled from "styled-components";
import { InquireText } from "./Component/InquireText";
import {
  FaCheckCircle,
  FaFeatherAlt,
  FaHandsWash,
  FaStar,
} from "react-icons/fa";
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
  width: 100%;
  max-width: 100vw;
  background-color: #d6e3c9;
  padding: 10px 0;

  h2 {
    font-size: 2rem;
    font-weight: bold;
    color: #305f55;
    margin: 0;

    span:first-of-type {
      color: #4da692;
      font-weight: 600;
    }
  }

  div {
    font-size: 1rem;
    margin: 0;
  }

  @media screen and (max-width: 800px) {
    h2 {
      font-size: 18px;
    }
    div {
      font-size: 10px;
    }
  }
`;

export const ButtonMapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 100vw;
  flex-wrap: wrap; /* 버튼이 넘치면 다음 줄로 이동 */
  gap: 12px; /* 버튼 사이 간격 */
  padding: 50px;
  background-color: #d6e3c9; // 밝고 청결한 느낌의 민트 배경

  img {
    width: 150px;
  }

  & > button {
    flex: 1 0 30%;
    padding: 10px;

    @media screen and (max-width: 800px) {
      img {
        width: 80px;
        height: 100px;
      }
      height: 15vh;
      display: flex;
      flex-direction: column;
      font-size: 12px;
      padding: 15px;
    }
  }

  @media screen and (max-width: 800px) {
    gap: 10px;
    padding: 30px;
  }
`;

const AcrosticBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background-color: white;
  width: 100%;

  span {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 1.2rem;
    line-height: 1.4;
    color: #333;

    @media screen and (max-width: 600px) {
      font-size: 14px;
      line-height: 1.5;
    }

    strong {
      color: #305f55;
      margin: 0 5px;
    }
    span {
      color: #f19a9a;
      font-weight: 700;
      font-size: 1.3rem;
      margin-left: 6px;

      @media screen and (max-width: 600px) {
        font-size: 14px;
      }
    }
  }
`;

const CleanButton = styled.button`
  background-color: aliceblue;
  border: 1px solid black;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bolder;

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

  @media screen and (max-width: 600px) {
    flex-direction: column;
    font-size: 15px;
    padding: 8px;

    gap: 0; /* 버튼 내 요소 사이 간격 제거 */
  }
`;

const CheckbuttonLeft = styled.a`
  flex: 1;
  text-decoration: none;
  color: inherit;
  display: block;

  div {
    background-color: #fff9db;
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 16px;
    gap: 6px;
    cursor: pointer;
    box-shadow: 4px 4px rgba(0, 0, 0, 0.1);

    span:first-child {
      font-size: 1.25rem;
      font-weight: bold;
      color: #305f55;

      @media screen and (max-width: 600px) {
        font-size: 1rem;
      }
    }

    span:last-child {
      font-size: 1rem;
      color: #a5947c;

      @media screen and (max-width: 600px) {
        font-size: 0.75rem;
      }
    }

    @media screen and (max-width: 600px) {
      padding: 10px;
    }
  }
`;

const Checkbuttonlight = styled.a`
  flex: 1;
  background-color: #ffe6e1;
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  flex-direction: column;
  padding-bottom: 12px;
  cursor: pointer; /* 기본 상태부터 커서를 클릭 가능한 손가락 모양으로 변경 */
  box-shadow: 4px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
  span:first-child {
    font-size: 1.55rem;
    font-weight: bold;
    color: #305f55;

    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
  }

  span:last-child {
    font-size: 1rem;
    color: #a5947c;

    @media screen and (max-width: 600px) {
      font-size: 0.75rem;
    }
  }
`;

export const MainPage = () => {
  const iconStyle = { marginRight: "8px", color: "#4a90e2", minWidth: "20px" };

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
      <MainMapper>
        <h2>
          <span>하루에 한집씩!</span>
          <span>차근차근!! 꼼꼼히!!</span>
        </h2>
        <div>어떤 업무를 하는 지 궁금하지 않으신가요?</div>
      </MainMapper>
      <ButtonMapper>
        {cleaning.map((data, index) => (
          <CleanButton
            key={index}
            onClick={() => handleClickSerive(data.cleanType)}
          >
            <img src={data.icon} alt="" />
            {data.cleanType}
          </CleanButton>
        ))}
      </ButtonMapper>

      <div
        style={{
          display: "flex",
          textAlign: "center",
          alignItems: "stretch", // 두 영역 높이 맞춤
          width: "100%",
          maxWidth: "100vw",
        }}
      >
        {/* 전화 걸기 영역 전체 클릭 가능 */}
        <CheckbuttonLeft href={`tel:${businessPhoneNumber}`} target="_blank">
          <div>
            <span>상담전화 걸기</span>
            <span>휴대전화에서 클릭 시 바로 연결</span>
          </div>
        </CheckbuttonLeft>

        {/* Q&A 영역 */}
        <Checkbuttonlight
          onClick={() => {
            handleClickQA();
          }}
        >
          <span>Q&A 보기</span>
          <span>예상 질문을 작성해봤어요!</span>
        </Checkbuttonlight>
      </div>

      <InquireText />

      <AcrosticBox>
        <span>
          <FaFeatherAlt style={{ ...iconStyle, marginRight: "8px" }} />
          <strong>은은하고 깨끗하게</strong> 잡티 하나 없이
        </span>
        <span>
          <FaHandsWash style={{ ...iconStyle, marginRight: "8px" }} />
          <strong>하나하나 정성스럽게</strong> 어머니의 손으로 꼼꼼히
        </span>
        <span>
          <FaStar style={{ ...iconStyle, marginRight: "8px" }} />
          <strong> 확인하여 청소하는</strong> <span>은하수홈케어</span>를
          선택해보세요.
        </span>
        <span>
          <FaCheckCircle style={{ ...iconStyle, marginRight: "8px" }} />
          <strong>절대 후회하지 않으실 겁니다. </strong>
        </span>
      </AcrosticBox>
      <BlogComment />
      <ImageGrid />
    </>
  );
};
