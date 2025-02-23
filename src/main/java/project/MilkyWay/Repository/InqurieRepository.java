package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.InqurieEntity;

@Repository
public interface InqurieRepository extends JpaRepository<InqurieEntity, String> {
}
