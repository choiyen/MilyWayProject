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
public class QuestionsDTO //고객 질문을 관리하기 위한 DTO
{


    @ApiModelProperty(value = "질문 Id", example = "dfsafdasf")
    private Long questionId; // Q&A 질문을 등록하기 위한 것

    @NotNull(message = "ExpectionQnA cannot be null")
    @NotBlank(message = "ExpectionQnA cannot be empty")
    @Size(min = 5, max= 20, message = "예상 Q&A의 질문은 최소 다섯자리 이상에 20자리 이하로 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "예상 질문", example = "새집증후군 신청 시 추가 요금은 대략 어떻게 정해지나요?", required = true)
    private  String ExpectionQnA; // 예상했던 Q&A 질문

    @NotNull(message = "ExpectionQnA cannot be null")
    @NotBlank(message = "ExpectionQnA cannot be empty")
    @Size(min = 5, message = "예상 질문 코멘트는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "예상 질문에 대한 답변", example = "평수에 따라 다르게 책정됩니다.", required = true)
    private String ExpectedComment; // 예상질문에 대한 해답
}
