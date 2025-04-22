import { FixedClientHeader } from "@/SCSS/Fixed";
import { Footer } from "../Common/Footer";
import { Outlet } from "react-router-dom";

export const ClientComonPage = () => {
  return (
    <div>
      <FixedClientHeader />
      <Outlet /> {/* 자식 라우트들이 여기 렌더링됨 */}
      <Footer />
    </div>
  );
};
