import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import ServiceScopeList from "./ServiceScopeList";
const ImageType = styled.img `
  width: 70%;
  height: 40vh;
  object-fit: cover;

  @media screen and (max-width: 600px) {
    width: 80%;
    height: 30vh;
  }
`;
const IntroductionDetail = ({ data }) => {
    return (_jsxs("div", { style: {
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "25px",
            padding: "40px 0",
        }, children: [_jsx("div", { style: {
                    fontSize: "28px",
                    fontWeight: "700",
                    borderBottom: "2px solid #00a59e",
                    paddingBottom: "8px",
                }, children: "\uC11C\uBE44\uC2A4 \uC548\uB0B4" }), _jsx(ImageType, { src: data.defaultImg, alt: data.Service }), _jsx("p", { style: {
                    width: "70%",
                    textAlign: "left",
                    whiteSpace: "pre-line",
                    fontSize: "16px",
                }, children: data.Introduction }), _jsx(ServiceScopeList, { Service: data.Service, ServiceList: data.ServiceList })] }));
};
export default IntroductionDetail;
