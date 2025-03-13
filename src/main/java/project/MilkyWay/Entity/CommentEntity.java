package project.MilkyWay.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "Comment")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class CommentEntity
{
    @Id
    @Column(name = "commentId", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)  // 자동 증가 설정
    private Long commentId; // 질문을 구분하기 위한 id
    @Column(name = "boardId", nullable = false)
    private String boardId;  // boardDTO와 연결하기 위한 것
    @Column(name = "type", nullable = false)
    private String type; // 관리자인지, 사용자인지?
    @Column(name = "comment", nullable = false)
    private String comment; // 댓글을 저장하기 위한 변수

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CommentEntity CommentEntity = (CommentEntity) o;
        return Objects.equals(commentId, CommentEntity.commentId) &&
                Objects.equals(boardId, CommentEntity.boardId) &&
                Objects.equals(type, CommentEntity.type) &&
                Objects.equals(comment, CommentEntity.comment);
    }

    @Override
    public int hashCode() {
        return Objects.hash(commentId, boardId, type, comment);
    }
}
