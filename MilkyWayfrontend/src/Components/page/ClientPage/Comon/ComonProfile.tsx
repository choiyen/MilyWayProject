import styled from "styled-components";
import { theme } from "@/SCSS/typecss";
import save2 from "@/Components/Common/assets/save2.gif";
import { Link } from "react-router-dom";

const ProfileWrapper = styled.div`
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  font-weight: bold;
  border-radius: 10px;
  padding: 10px;
  user-select: none;
  color: ${theme.colors.starlightWhite};
`;

const Line1 = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${theme.colors.starlightWhite};
  display: block;
  margin-bottom: 10px;
`;

const Line2 = styled.span`
  font-size: 20px;
  color: ${theme.colors.softCoral};
  display: block;
  margin-bottom: 10px;
  font-weight: normal;

  span {
    font-weight: bold;
    color: ${theme.colors.softCoral};
  }
`;

const Line3 = styled.span`
  font-size: 20px;
  color: ${theme.colors.hazeRose};
  display: block;
`;

const AboutLink = styled(Link)`
  display: inline-block;
  margin-top: 15px;
  padding: 8px 20px;
  background-color: transparent;
  color: ${theme.colors.starlightWhite};
  border: 2px solid ${theme.colors.auroraBlue};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.auroraBlue};
    color: white;
  }
`;

export const ComonProfile = () => {
  return (
    <ProfileWrapper>
      <ProfileImage src={save2} alt="profile-animation" />
      <TextContainer>
        <Line1>고객 모두를 하나의 가족 같은 마음으로!!!</Line1>
        <Line2>
          <span>은하수 홈케어</span>는 고객님의 소중한 공간을 깨끗하게 만들어
          드립니다.
        </Line2>
        <Line3>고객, 여러분의 방문을 진심으로 환영합니다.</Line3>
        <AboutLink to="/Client/Info">About</AboutLink>
      </TextContainer>
    </ProfileWrapper>
  );
};
