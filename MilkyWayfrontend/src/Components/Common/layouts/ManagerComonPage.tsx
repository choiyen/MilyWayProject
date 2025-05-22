import { FixedManagerHeader } from "@/SCSS/Fixed";
import { Footer } from "../frame/Footer";
import { Outlet } from "react-router-dom";
import { ComonProfile } from "@/Components/page/ClientPage/Comon/ComonProfile";
import styled from "styled-components";
const MobileBox = styled.div`
  @media (max-width: 1044px) {
    display: none;
  }
`;
export const ManagerCommonPage = () => {
  return (
    <div>
      <FixedManagerHeader>
        <MobileBox>
          <ComonProfile />
        </MobileBox>
        <Outlet /> {/* 자식 라우트들이 여기 렌더링됨 */}
        <Footer />
      </FixedManagerHeader>
    </div>
  );
};
