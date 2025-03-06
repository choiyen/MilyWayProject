import { useNavigate } from "react-router-dom";

export const GateWayType = {
  ManagerMain: "/Manger/Login",
  ManagerAdvice: "/Manger/Advice",
  ManagerQuestion: "/Manager/Question",
};

export const GateWayFunc = (name: string) => {
  const navigate = useNavigate();
  const FuncClick = () => {
    navigate(name);
  };

  return FuncClick;
};
