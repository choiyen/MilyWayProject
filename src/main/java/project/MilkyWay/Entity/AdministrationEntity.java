package project.MilkyWay.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;
import java.util.Date;



@Entity
@Table(name = "administration" )
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class AdministrationEntity
{
    @Id
    @Column(name= "administrationId")
    private String administrationId; //일정표를 관리하기 위한 id
    @Column(name= "Date", nullable = false, unique = true)
    private Date administrationDate; //일정을 기록할 id
    @Column(name= "Type", nullable = false)
    private String adminstrationType; // 일정의 유형 - 휴일, 일하는 날, 현재 비어있는 날

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "administrationId", referencedColumnName = "administrationId", updatable = false, insertable = false)
    private ReservationEntity reservationEntity;

}
