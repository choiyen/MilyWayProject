package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

import java.util.Date;


@Getter
@Builder
public class ReservationDTO //고객의 예약을 관리하기 위한 DTO
{
    String reservationId; //예약을 관리하기 위한 ID
    String administrationId;
    String acreage;
    String roomcount; // 방/화장실/베란다 갯수를 기록하기 위한 것
    String name; // 고객의 이름
    String phone; // 전화번호
    String Address; // 주소(암호화 처리 필요)
    Date SubissionDate; // 예약 날짜
}
