package project.MilkyWay.DTO;

import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(value = "답변 정보 Id", example = "444")
    private Long commentId; // 답변을 구분하기 위한 id

    @NotNull(message = "boardId cannot be null")
    @NotBlank(message = "boardId cannot be empty")
    @Size(min = 5, message = "boardId는 최소 다섯자리 이상 입력해야 함.")
    @ApiModelProperty(value = "게시판 정보 Id", example = "dfasfdsfsafasfwv!ED", required = true)
    private String boardId;  // boardDTO와 연결하기 위한 것

    @NotNull(message = "type cannot be null")
    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, message = "type는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "댓글을 단 사람의 유형", example = "관리자", required = true)
    private String type; // 관리자인지, 사용자인지? 로그인 시에는 관리자, 비로그인 시에는 고객으로 판단

    @NotNull(message = "type cannot be null")
    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, message = "type는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "댓글 내용", example = "네, 요구사항은 대부분 반영되나, 추가 요금이 있을 수 있습니다.", required = true)
    private String comment; // 댓글을 저장하기 위한 변수
}
