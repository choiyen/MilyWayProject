package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;

@Getter
@Builder
public class AddressDTO
{
    String AddressId;
    String customer;
    String Address;
    String phoneNumber;
    Date SubmissionDate;
}
//- 현재 날짜보다 고객의 의뢰 날짜가 뒷날일 떄 데이터를 파기하는 함수 필요
//고객 관리를 위한 목적의 DTO