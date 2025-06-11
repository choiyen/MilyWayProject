import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { theme } from "@/SCSS/typecss";
import { ServiceProfiling } from "../ServiceProfileing";
import styled from "styled-components";
const ImageCardContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 30px;
  justify-items: center;

  @media screen and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    padding: 20px;
  }
`;
const ImageCard = styled.div `
  width: 400px;
  height: 180px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-end;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;

  @media screen and (max-width: 800px) {
    width: 170px;
    font-size: 12px;
  }
`;
const ServiceSelector = ({ setSelect, }) => {
    return (_jsx(ImageCardContainer, { children: ServiceProfiling.map((service, index) => (_jsx(ImageCard, { image: service.image, onClick: () => setSelect(service.Service), children: _jsxs("div", { style: {
                    color: `${theme.colors.charcoalBlack}`,
                    backgroundColor: "rgba(198, 169, 169, 0.4)",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                }, children: [service.Service, _jsx("span", { style: { color: `${theme.colors.cloudGrey}` }, children: service.target })] }) }, index))) }));
};
export default ServiceSelector;
