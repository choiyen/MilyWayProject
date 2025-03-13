package project.MilkyWay.DTO;


import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class BoardDTO
{

    @ApiModelProperty(value = "게시판 정보 Id", example = "dfasfdsfsafasfwv!ED")
    private String boardId; // 그냥 1씩 증가하는 int로 작성(데이터 수정을 위한 목적) - 게시판 질문

    @NotNull(message = "title cannot be null")
    @NotBlank(message = "title cannot be empty")
    @Size(min = 5, message = "title는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "타이틀 이름", example = "아이가 아토피가 있는데, 이런 요구사항도 반영해주시나요?", required = true)
    private String title; // 게시판 질문의 제목을 저장하는 변수

    @NotNull(message = "content cannot be null")
    @NotBlank(message = "content cannot be empty")
    @Size(min = 5, message = "content는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "게시판 글", example = "내용은 제목과 동일합니다.", required = true)
    private String content; // 게시판의 내용을 저장하는 변수
}
