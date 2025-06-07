import styled from "styled-components";
import { BsQuestionDiamond, BsTelephoneFill } from "react-icons/bs";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";

const QuestionTitle = styled.h2`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: 700;
  color: #ca8383;
  margin: 50px 0 30px;
  gap: 12px;

  @media screen and (max-width: 600px) {
    font-size: 24px;
  }
`;

const SupportBanner = styled.section`
  width: 100%;
  min-height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e0f7f1;
  padding: 40px 20px;
  text-align: center;
`;

const InfoText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  max-width: 600px;
  margin-bottom: 25px;
  line-height: 1.6;
`;

const CallButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background-color: #00a59e;
  color: white;
  font-size: 20px;
  font-weight: 600;
  padding: 12px 20px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 165, 158, 0.2);

  &:hover {
    background-color: #007a74;
  }

  svg {
    flex-shrink: 0;
  }

  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
`;

export const ClientPhoneNumber = () => {
  const width = useWindowWidth();
  const isMobile = width <= 600;

  return (
    <SupportBanner>
      <QuestionTitle>
        <BsQuestionDiamond size={32} />
        궁금한 점이 있으신가요?
      </QuestionTitle>
      <InfoText>
        {isMobile
          ? "전화 문의는 언제든지 환영입니다!"
          : "은하수 홈케어는 언제나 여러분의 문의를 환영합니다. 편하게 연락 주세요!"}
      </InfoText>
      <CallButton href="tel:01065131458">
        <BsTelephoneFill size={22} />
        전화 문의하기
      </CallButton>
    </SupportBanner>
  );
};
