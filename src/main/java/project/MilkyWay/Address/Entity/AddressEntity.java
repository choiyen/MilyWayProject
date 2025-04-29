package project.MilkyWay.Address.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Objects;

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
    private String address;
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    @Column(name = "SubmissionDate", nullable = false)
    private LocalDate submissionDate;

    @Column(name = "acreage", nullable = false)
    private String acreage;

    @Column(name = "cleanType", nullable = false)
    private String cleanType; // 관리자인지, 사용자인지?


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEntity AddressEntity = (AddressEntity) o;
        return Objects.equals(addressId, AddressEntity.addressId) &&
                Objects.equals(customer, AddressEntity.customer) &&
                Objects.equals(address, AddressEntity.address) &&
                Objects.equals(phoneNumber, AddressEntity.phoneNumber) &&
                Objects.equals(submissionDate, AddressEntity.submissionDate) && Objects.equals(acreage, AddressEntity.acreage)&& Objects.equals(cleanType, AddressEntity.cleanType);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(addressId, customer, address,phoneNumber, submissionDate, acreage);
    }

}
