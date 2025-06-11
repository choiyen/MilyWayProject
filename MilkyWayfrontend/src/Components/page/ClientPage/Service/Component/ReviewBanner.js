import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
const Review = styled.div `
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin: 40px auto 20px;
  padding: 16px 24px;
  max-width: 800px;

  @media screen and (max-width: 600px) {
    font-size: 15px;
    margin: 20px auto 0px;
  }
`;
export const ReviewBanner = () => {
    return (_jsxs(Review, { children: ["\uD83E\uDDF9 \uBABB\uBBF8\uB354\uC6B0\uC2E0\uAC00\uC694?", " ", _jsx("span", { style: { color: "#00a59e" }, children: "\uCCAD\uC18C \uD6C4\uAE30 \uBE14\uB85C\uADF8" }), "\uB97C \uD655\uC778\uD574\uBCF4\uC138\uC694!"] }));
};
