export const timeout = import.meta.env.VITE_MEDIUM_REQUEST_TIMEOUT;
export const baseURL = import.meta.env.VITE_DEFAULT_URL;
export const checkSession = () => {
    // 모든 쿠키 가져오기
    const cookies = document.cookie;
    // JSESSIONID 쿠키가 있는지 확인
    if (cookies.includes("JSESSIONID")) {
        console.log("세션이 유효합니다.");
        return true;
    }
    else {
        console.log("세션이 만료되었습니다.");
        return false;
    }
};
