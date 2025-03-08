package project.MilkyWay.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Value;

import java.util.Collection;
import java.util.Date;
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
    private String Address;
    @Column(name = "phoneNumber", nullable = false)
    private String phoneNumber;
    @Column(name = "SubmissionDate", nullable = false)
    private Date SubmissionDate;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AddressEntity AddressEntity = (AddressEntity) o;
        return Objects.equals(addressId, AddressEntity.addressId) &&
                Objects.equals(customer, AddressEntity.customer) &&
                Objects.equals(Address, AddressEntity.Address) &&
                Objects.equals(phoneNumber, AddressEntity.phoneNumber) &&
                Objects.equals(SubmissionDate, AddressEntity.SubmissionDate);
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(addressId, customer, Address,phoneNumber, SubmissionDate);
    }

}
