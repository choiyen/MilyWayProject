package project.MilkyWay.Inquire.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name = "Inqurie")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class InquireEntity
{
    @Id
    @Column(name = "inquireId")
    private String inquireId;
    @Column(name = "address", nullable = false)
    private String address;
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    @Column(name = "inquire", nullable = false)
    private String inquire;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InquireEntity InquireEntity = (InquireEntity) o;
        return Objects.equals(inquireId, InquireEntity.inquireId) &&
                Objects.equals(address, InquireEntity.address) &&
                Objects.equals(phoneNumber, InquireEntity.phoneNumber) &&
                Objects.equals(inquire, InquireEntity.inquire);
    }

    @Override
    public int hashCode() {
        return Objects.hash(inquireId, address, phoneNumber, inquire);
    }
}
//고객의 상담을 받기 위한 Entity니까, 따로 묶을 이유는 없음(그 날짜가 상담 가능한 날짜인지만 확인하면 됨)
