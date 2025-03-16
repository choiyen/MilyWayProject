package project.MilkyWay.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.AdministrationEntity;

import java.time.LocalDate;
import java.util.Date;

@Repository
public interface AdministrationRepository extends JpaRepository<AdministrationEntity, String>
{
    AdministrationEntity findByAdministrationId(String administrationId);
    boolean existsByAdministrationId(String administrationId);
    void deleteByAdministrationId(String administrationId);
    boolean existsByAdministrationDate(LocalDate AdministrationDate);
}
