import { FixedClientHeader } from "@/SCSS/Fixed";
import { Footer } from "../frame/Footer";
import { Outlet } from "react-router-dom";
import { ComonProfile } from "@/Components/page/ClientPage/Comon/ComonProfile";
import { ClientPhoneNumber } from "./ClientPhoneNumber";
import styled from "styled-components";

const MobileBox = styled.div`
  @media (max-width: 1044px) {
    display: none;
  }
`;

export const ClientComonPage = () => {
  return (
    <div>
      <FixedClientHeader>
        <MobileBox>
          <ComonProfile />
        </MobileBox>
        <Outlet />
        <ClientPhoneNumber />
        <Footer />
      </FixedClientHeader>
    </div>
  );
};
