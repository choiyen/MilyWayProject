import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
export const Greeting = ({ GreetingText }) => {
    const sentences = GreetingText.split(". ").filter(Boolean);
    return (_jsx("div", { children: sentences.map((sentence, idx) => (_jsx("div", { className: "bg-gray-100", children: _jsxs("p", { className: " text-gray-950 leading-relaxed text p-2", children: [sentence.trim(), idx < sentences.length - 1 ? "." : ""] }, idx) }))) }));
};
