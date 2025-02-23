package project.MilkyWay.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.BoardEntity;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, String>
{
}
