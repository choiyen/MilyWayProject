package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.CommentEntity;

import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, String>
{
    CommentEntity findByCommentId(Long commentId);
    List<CommentEntity> findByBoardId(String BoardId);
    boolean existsByCommentId(Long commentId);
    void deleteByCommentId(Long commentId);
}
