package project.MilkyWay.Service;

import org.springframework.stereotype.Service;

@Service
public class UserService //관리자 아이디를 관리하는 DTO
{
    String userID; //아이디
    String Password; //비밀번호
    String email; //비밀번호 찾기 구현을 위한 이메일
}
