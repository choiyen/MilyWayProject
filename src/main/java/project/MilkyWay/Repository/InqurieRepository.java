package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.BoardEntity;
import project.MilkyWay.Entity.InquireEntity;

@Repository
public interface InqurieRepository extends JpaRepository<InquireEntity, String>
{
    BoardEntity findByInquireId(String InquireId);
    boolean existsByInquireId(String InquireId);
    void deleteByInquireId(String InqurieId);
}
