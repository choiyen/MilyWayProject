package project.MilkyWay.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.AdministrationEntity;

@Repository
public interface AdministrationRepository extends JpaRepository<AdministrationEntity, String>
{
    AdministrationEntity findByAdministrationId(String administrationId);
    boolean existsByAdministrationId(String administrationId);
    void deleteByAdministrationId(String administrationId);
}
