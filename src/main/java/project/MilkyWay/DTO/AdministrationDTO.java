package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class AdministrationDTO
{
    String administrationId; //일정표를 관리하기 위한 id
    Date administrationDate; //일정을 기록할 id
    String adminstrationType; // 일정의 유형 - 휴일, 일하는 날, 현재 비어있는 날
}
