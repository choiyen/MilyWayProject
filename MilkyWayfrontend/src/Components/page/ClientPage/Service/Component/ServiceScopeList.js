import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { MdCheckCircle } from "react-icons/md";
import styled from "styled-components";
const ImageType = styled.img `
  width: 70%;
  height: 40vh;
  object-fit: cover;

  @media screen and (max-width: 600px) {
    width: 80%;
    height: 30vh;
  }
`;
const ReviewContainer = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;
const ServiceScopeList = ({ Service, ServiceList }) => {
    return (_jsxs("div", { style: { width: "100%", padding: "0 5%" }, children: [_jsx("h3", { style: {
                    fontSize: "24px",
                    margin: "40px 0 20px",
                }, children: _jsxs("span", { style: {
                        display: "inline-block",
                        borderBottom: "2px solid #00a59e",
                        fontWeight: "bold",
                        paddingBottom: "20px",
                    }, children: [Service, "\uC758 \uC11C\uBE44\uC2A4 \uBC94\uC704"] }) }), ServiceList?.map((item, idx) => (_jsxs("div", { style: {
                    marginBottom: "30px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }, children: [_jsx(ImageType, { src: item.ImageComment, alt: "", style: { width: "500px" } }), _jsx("h4", { style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                            margin: "10px 50px",
                        }, children: item.name }), _jsx("div", { style: { marginTop: "30px" }, children: item.ServiceList.map((value, i) => (_jsxs(ReviewContainer, { children: [_jsx(MdCheckCircle, { color: "#00a59e", size: 20, style: { marginRight: "10px" } }), _jsx("span", { children: value })] }, i))) })] }, idx)))] }));
};
export default ServiceScopeList;
