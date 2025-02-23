package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentDTO
{
    String commentId; // 질문을 구분하기 위한 id
    String boardId;  // boardDTO와 연결하기 위한 것
    String type; // 관리자인지, 사용자인지?
    String comment; // 댓글을 저장하기 위한 변수
}
