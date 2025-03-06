package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.BoardEntity;
import project.MilkyWay.Entity.InquireEntity;

import java.util.List;

@Repository
public interface InqurieRepository extends JpaRepository<InquireEntity, String>
{
    List<InquireEntity> findAll();
    InquireEntity findByInquireId(String InquireId);
    boolean existsByInquireId(String InquireId);
    void deleteByInquireId(String InqurieId);
}
