import { GateWayNumber, ManagerGateWayType } from "@/types/GateWay/GateWayType";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DisplayLink = styled(Link)`
  display: inline-block;
  margin-top: 30px;
  font-weight: bold;
  color: #2c6e49;
  text-decoration: underline;
`;

export const SiginButton = () => {
  const width = useWindowWidth();
  const isMobile = width <= 600;

  return (
    <DisplayLink
      to={
        GateWayNumber.Manager + "/" + ManagerGateWayType.SignUp // 관리자용 링크
      }
    >
      {isMobile
        ? "회원가입 하러 가기"
        : "아직 서버를 관리하는 사람이 없나요? 없다면 눌러주세요"}
    </DisplayLink>
  );
};
