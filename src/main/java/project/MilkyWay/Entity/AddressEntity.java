package project.MilkyWay.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collection;
import java.util.Date;

@Entity
@Table(name = "Address")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class AddressEntity
{
    @Id
    @Column(name = "addressId", nullable = false)
    private String addressId;
    @Column(name = "customer", nullable = false)
    private String customer;
    @Column(name = "Address", nullable = false)
    private String Address;
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    @Column(name = "SubmissionDate", nullable = false)
    private Date SubmissionDate;

}
