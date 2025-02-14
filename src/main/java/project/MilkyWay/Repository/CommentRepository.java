package project.MilkyWay.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import project.MilkyWay.Entity.CommentEntity;

public interface CommentRepository extends JpaRepository<CommentEntity, String> {
}
