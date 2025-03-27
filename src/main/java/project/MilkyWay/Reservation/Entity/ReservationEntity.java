package project.MilkyWay.Reservation.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "reservation")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@ToString
public class ReservationEntity
{
    @Id
    @Column(name = "reservationId")
    private String reservationId; //예약을 관리하기 위한 ID
    @Column(name = "administrationId")
    private String administrationId;
    @Column(name = "acreage") //청소 유형
    private String acreage;
    @Column(name = "name")
    private String name; // 고객의 이름
    @Column(name = "phone")
    private String phone; // 전화번호
    @Column(name = "Address")
    private String address; // 주소(암호화 처리 필요)
    @Column(name = "SubissionDate")
    private LocalDate subissionDate; // 예약 날짜

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReservationEntity reservationEntity = (ReservationEntity) o;
        return Objects.equals(reservationId, reservationEntity.reservationId) &&
                Objects.equals(administrationId, reservationEntity.administrationId) &&
                Objects.equals(acreage, reservationEntity.acreage) &&
                Objects.equals(name, reservationEntity.name) &&
                Objects.equals(phone, reservationEntity.phone) &&
                Objects.equals(address, reservationEntity.address) &&
                Objects.equals(subissionDate, reservationEntity.subissionDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reservationId, administrationId, acreage, name, phone, address, subissionDate);
    }

}
