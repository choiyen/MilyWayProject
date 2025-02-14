package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.AddressEntity;

@Repository
public interface AddressRepository extends JpaRepository<AddressEntity, String> {
}
