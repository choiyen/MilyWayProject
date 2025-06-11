import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// src/components/common/GlobalErrorBoundary.tsx
import { useRouteError, isRouteErrorResponse } from "react-router-dom";
const GlobalErrorBoundary = () => {
    const error = useRouteError();
    // React Router에서 발생한 에러라면
    if (isRouteErrorResponse(error)) {
        return (_jsxs("div", { style: { padding: "2rem", textAlign: "center" }, children: [_jsxs("h1", { children: ["\uD83D\uDEA8 ", error.status, " - ", error.statusText] }), _jsx("p", { children: error.data ?? "페이지를 찾을 수 없습니다." })] }));
    }
    // 일반 JS Error
    if (error instanceof Error) {
        return (_jsxs("div", { style: { padding: "2rem", textAlign: "center" }, children: [_jsx("h1", { children: "\uD83D\uDE35 \uC624\uB958 \uBC1C\uC0DD!" }), _jsx("p", { children: error.message })] }));
    }
    // 알 수 없는 에러
    return (_jsxs("div", { style: { padding: "2rem", textAlign: "center" }, children: [_jsx("h1", { children: "\u2757 \uC608\uAE30\uCE58 \uC54A\uC740 \uC624\uB958" }), _jsx("p", { children: "\uBB38\uC81C\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694." })] }));
};
export default GlobalErrorBoundary;
