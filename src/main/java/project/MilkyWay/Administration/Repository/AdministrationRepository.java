package project.MilkyWay.Administration.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Administration.Entity.AdministrationEntity;

import java.time.LocalDate;

@Repository
public interface AdministrationRepository extends JpaRepository<AdministrationEntity, String>
{
    AdministrationEntity findByAdministrationId(String administrationId);
    boolean existsByAdministrationId(String administrationId);
    void deleteByAdministrationId(String administrationId);
    boolean existsByAdministrationDate(LocalDate AdministrationDate);
    AdministrationEntity findByAdministrationDate(LocalDate subissionDate);
}
