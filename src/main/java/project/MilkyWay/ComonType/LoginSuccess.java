package project.MilkyWay.ComonType;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class LoginSuccess
{
    public boolean isSessionExist(HttpServletRequest request) {
        // 세션이 존재하는지 확인 (세션이 없으면 null 반환)
        HttpSession session = request.getSession(false);

        // 세션이 존재하면 true, 존재하지 않으면 false
        return session != null;
    }
}
