import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@/SCSS/tailwind.scss";
import { toast } from "react-toastify";
import { useWindowWidth } from "@/types/hooks/useWindowWidth";
import { useEffect } from "react";
export const PageNavigator = ({ CurrentPage, setCurrentPage, TotalPage, }) => {
    const width = useWindowWidth();
    const isMobile = width <= 600;
    useEffect(() => {
        console.log(TotalPage.current);
    }, [TotalPage]);
    return (_jsx("div", { children: _jsx("div", { className: "flex justify-center mt-3", children: _jsx("div", { className: `flex mb-10 items-center ${isMobile ? "space-x-2 gap-2" : "space-x-6 gap-10"}`, children: _jsxs("div", { className: `flex items-center ${isMobile ? "space-x-1 gap-1" : "space-x-2 gap-5"}`, children: [_jsx("button", { className: `rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none ${isMobile ? "px-2 py-0.5 text-sm" : "px-3 py-1 text-base"}`, "aria-label": "\uC774\uC804 \uD398\uC774\uC9C0", onClick: () => {
                                if (CurrentPage > 0) {
                                    setCurrentPage(CurrentPage - 1);
                                }
                            }, children: "<" }), Array.from({ length: Math.max(TotalPage.current ?? 0, 1) }, (_, index) => (_jsx("button", { className: `rounded-md border border-gray-300 hover:bg-blue-100 focus:outline-none ${isMobile ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-base"} ${CurrentPage === index
                                ? "bg-blue-300 font-semibold"
                                : "bg-white"}`, onClick: () => {
                                setCurrentPage(index);
                            }, children: index + 1 }, index))), _jsx("button", { className: `rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none ${isMobile ? "px-2 py-0.5 text-sm" : "px-3 py-1 text-base"}`, "aria-label": "\uB2E4\uC74C \uD398\uC774\uC9C0", onClick: () => {
                                if (TotalPage.current > CurrentPage + 1) {
                                    setCurrentPage(CurrentPage + 1);
                                }
                                else {
                                    toast("페이지 변경 불가 : 전체 페이지 수 초과", {
                                        position: "top-center",
                                        autoClose: 3000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }
                            }, children: ">" })] }) }) }) }));
};
