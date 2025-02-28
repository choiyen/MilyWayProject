package project.MilkyWay.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Entity.BoardEntity;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, String>
{
    BoardEntity findByBoardId(String boardId);
    boolean existsByBoardId(String boardId);
    void deleteByBoardId(String boardId);
}
