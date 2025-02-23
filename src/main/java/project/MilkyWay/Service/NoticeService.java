package project.MilkyWay.Service;


import org.springframework.stereotype.Service;

@Service
public class NoticeService
{
    String NoticeId; // 후기 ID : primary key이자 10자리의 렌덤키
    String type; // 어떤 유형의 일 : 이사청소, 입주청소, 주거청소.....
    String greeting;
}
