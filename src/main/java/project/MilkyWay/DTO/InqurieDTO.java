package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class InqurieDTO
{
    String InqurieId;
    String Address;
    String PhoneNumber;
    String Inqurie;
    Date SubmissionDate;
}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO