import styled from "styled-components";
import blog from "@/Components/Common/assets/blog.jpg";
import band from "@/Components/Common/assets/band.png";
import kakaoTalk from "@/Components/Common/assets/kakaoTalk.png";
import instar from "@/Components/Common/assets/instar.webp";
import { Link } from "react-router-dom";

const WidgetContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
`;

const ImgWidget = styled.img`
  border-radius: 50%;
`;
const RoundWidget = styled.div`
  width: 80px;
  height: 80px;
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
  const handleKakaoTalk = () => {
    window.open("https://open.kakao.com/o/g1b2c5Yc", "_blank");
  };

  return (
    <WidgetContainer>
      <RoundWidget>
        <Link to="https://blog.naver.com/shingi02">
          <ImgWidget src={blog} alt="네이버 블로그 접속 링크" />
        </Link>
      </RoundWidget>
      <RoundWidget>
        <Link to="https://www.band.us/band/70391878/intro">
          <ImgWidget src={band} alt="네이버 밴드 접속 링크" />
        </Link>
      </RoundWidget>
      <RoundWidget>
        <ImgWidget src={kakaoTalk} alt="" onClick={handleKakaoTalk} />
      </RoundWidget>
      <RoundWidget>
        <Link to="https://www.instagram.com/shin_gi02/#">
          <ImgWidget src={instar} alt="" />
        </Link>
      </RoundWidget>
    </WidgetContainer>
  );
};
