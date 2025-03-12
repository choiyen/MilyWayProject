package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.CommentEntity;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, String>
{
    CommentEntity findByCommentId(UUID commentId);
    List<CommentEntity> findByBoardId(String BoardId);
    boolean existsByCommentId(String boardId);
    void deleteByCommentId(String boardId);
}
