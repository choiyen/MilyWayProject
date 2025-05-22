package project.MilkyWay.Address.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Address.Entity.AddressEntity;

import java.time.LocalDate;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, String>
{
    AddressEntity findByAddressId(String addressId);
    AddressEntity findBySubmissionDate(LocalDate SubmissionDate);
    boolean existsBySubmissionDate(LocalDate SubmissionDate);
    boolean existsByAddressId(String addressId);
    void deleteByAddressId(String addressId);
}
