import { FixedManagerHeader } from "@/SCSS/Fixed";
import { Footer } from "../frame/Footer";
import { Outlet } from "react-router-dom";
import { ClientPhoneNumber } from "./ClientPhoneNumber";

export const ManagerCommonPage = () => {
  return (
    <div>
      <FixedManagerHeader />
      <Outlet /> {/* 자식 라우트들이 여기 렌더링됨 */}
      <ClientPhoneNumber />
      <Footer />
    </div>
  );
};
