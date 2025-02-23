package project.MilkyWay.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "reservation")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class ReservationEntity
{
    @Id
    @Column(name = "Id")
    private String reservationId; //예약을 관리하기 위한 ID
    @Column(name = "administrationId")
    private String administrationId;
    @Column(name = "acreage") //청소 유형
    private String acreage;
    @Column(name = "roomcount")
    private String roomcount; // 방/화장실/베란다 갯수를 기록하기 위한 것
    @Column(name = "name")
    private String name; // 고객의 이름
    @Column(name = "phone")
    private String phone; // 전화번호
    @Column(name = "Address")
    private String Address; // 주소(암호화 처리 필요)
    @Column(name = "Subission")
    private Date SubissionDate; // 예약 날짜
}
