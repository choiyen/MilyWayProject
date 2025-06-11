import { jsx as _jsx } from "react/jsx-runtime";
import { Helmet, HelmetData } from "react-helmet-async";
const helmetData = new HelmetData({});
export const Head = ({ title = "", description = "" } = {}) => {
    return (_jsx(Helmet, { helmetData: helmetData, title: title ? `${title} | Bulletproof React` : undefined, defaultTitle: "Bulletproof React", children: _jsx("meta", { name: "description", content: description }) }));
};
