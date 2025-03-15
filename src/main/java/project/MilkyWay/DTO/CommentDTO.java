package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import project.MilkyWay.Enum.EnumValue;
import project.MilkyWay.Enum.UserType;


@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class CommentDTO
{
    @Schema(description = "답변 정보 Id", example = "444")
    private Long commentId; // 답변을 구분하기 위한 id

    @NotBlank(message = "boardId cannot be empty")
    @Schema(description = "게시판 정보 Id", example = "dfasfdsfsafasfwv!ED")
    private String boardId;  // boardDTO와 연결하기 위한 것

    @NotNull(message = "type cannot be empty")
    @Schema(description = "댓글을 단 사람의 유형", example = "관리자")
    @EnumValue(enumClass = UserType.class, message = "허용되지 않은 유저 타입입니다.")
    private UserType type; // 관리자인지, 사용자인지? 로그인 시에는 관리자, 비로그인 시에는 고객으로 판단

    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, message = "type는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣.,?!& ]*$", message = "comment은 대소문자, 한글, 숫자, 특수문자(.,?!& )만 입력 가능합니다.")
    @Schema(description = "댓글 내용", example = "네, 요구사항은 대부분 반영되나, 추가 요금이 있을 수 있습니다.")
    private String comment; // 댓글을 저장하기 위한 변수
}
