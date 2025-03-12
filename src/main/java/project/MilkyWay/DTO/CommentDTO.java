package project.MilkyWay.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.UUID;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class CommentDTO
{
    private UUID commentId; // 질문을 구분하기 위한 id

    @NotNull(message = "boardId cannot be null")
    @NotBlank(message = "boardId cannot be empty")
    @Size(min = 5, message = "boardId는 최소 다섯자리 이상 입력해야 함.")
    private String boardId;  // boardDTO와 연결하기 위한 것

    @NotNull(message = "type cannot be null")
    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, message = "type는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    private String type; // 관리자인지, 사용자인지?

    @NotNull(message = "type cannot be null")
    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, message = "type는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    private String comment; // 댓글을 저장하기 위한 변수
}
