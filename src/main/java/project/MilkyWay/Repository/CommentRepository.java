package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.MilkyWay.Entity.CommentEntity;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, String> {
}
