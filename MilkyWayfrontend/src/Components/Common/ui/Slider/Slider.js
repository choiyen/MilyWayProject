import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
export const Slider = ({ URL }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFocused, setIsFocused] = useState(false);
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? URL.length - 1 : prev - 1));
    };
    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === URL.length - 1 ? 0 : prev + 1));
    };
    // 👉 포커스 중일 때만 자동 슬라이드
    useEffect(() => {
        if (!isFocused)
            return;
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(timer);
    }, [isFocused]);
    return (_jsxs("div", { className: "relative w-3/4 h-[300px] overflow-hidden rounded-lg mb-4 max-sm:w-11/12 max-sm:h-48", onMouseEnter: () => setIsFocused(true), onMouseLeave: () => setIsFocused(false), onFocus: () => setIsFocused(true), onBlur: () => setIsFocused(false), tabIndex: 0, children: [_jsx("img", { src: URL[currentIndex], alt: `Image ${currentIndex + 1}`, className: "w-full h-full object-cover transition-all duration-500" }), _jsx("button", { onClick: prevSlide, className: "absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full z-10", children: "\u25C0" }), _jsx("button", { onClick: nextSlide, className: "absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full z-10", children: "\u25B6" }), _jsx("div", { className: "absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1", children: URL.map((_, idx) => (_jsx("div", { className: `w-2 h-2 rounded-full ${idx === currentIndex ? "bg-white" : "bg-gray-400"}` }, idx))) })] }));
};
