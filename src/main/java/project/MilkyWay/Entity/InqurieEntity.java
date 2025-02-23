package project.MilkyWay.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Inqurie")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class InqurieEntity
{
    @Id
    @Column(name = "InqurieId")
    private String InqurieId;
    @Column(name = "Address", nullable = false)
    private String Address;
    @Column(name = "PhoneNumber", nullable = false)
    private String PhoneNumber;
    @Column(name = "Inqurie", nullable = false)
    private String Inqurie;
    @Column(name= "SubmissionDate", nullable = false)
    private Date SubmissionDate;
}
//고객의 상담을 받기 위한 Entity니까, 따로 묶을 이유는 없음(그 날짜가 상담 가능한 날짜인지만 확인하면 됨)
