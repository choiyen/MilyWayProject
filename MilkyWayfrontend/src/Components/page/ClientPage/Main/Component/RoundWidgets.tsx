import styled from "styled-components";
import blog from "@/Components/Common/assets/blog.jpg";
import facebook from "@/Components/Common/assets/facebook.png";
import kakaoTalk from "@/Components/Common/assets/kakaoTalk.png";
import instar from "@/Components/Common/assets/instar.webp";

const WidgetContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 24px;
  z-index: 1000;
`;

const ImgWidget = styled.img`
  border-radius: 50%;
`;
const RoundWidget = styled.div`
  width: 100px;
  height: 100px;
  background-color: #81d4a3;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    background-color: #6fcf97;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const RoundWidgets = () => {
  return (
    <WidgetContainer>
      <RoundWidget>
        <ImgWidget src={blog} alt="" />
      </RoundWidget>
      <RoundWidget>
        <ImgWidget src={facebook} alt="" />
      </RoundWidget>
      <RoundWidget>
        <ImgWidget src={kakaoTalk} alt="" />
      </RoundWidget>
      <RoundWidget>
        <ImgWidget src={instar} alt="" />
      </RoundWidget>
    </WidgetContainer>
  );
};
