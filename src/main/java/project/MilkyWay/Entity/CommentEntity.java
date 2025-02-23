package project.MilkyWay.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

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
    private String commentId; // 질문을 구분하기 위한 id
    @Column(name = "boardId", nullable = false)
    private String boardId;  // boardDTO와 연결하기 위한 것
    @Column(name = "type", nullable = false)
    private String type; // 관리자인지, 사용자인지?
    @Column(name = "comment", nullable = false)
    private String comment; // 댓글을 저장하기 위한 변수
}
