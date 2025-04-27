package project.MilkyWay.ComonType;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class LoginSuccess
{
    public boolean isSessionExist(HttpServletRequest request) {
        // 세션이 존재하는지 확인 (세션이 없으면 null 반환)
        String userId = (String) request.getSession().getAttribute("userId");

        // 세션이 존재하면 true, 존재하지 않으면 false
        return userId != null;
    }
}
