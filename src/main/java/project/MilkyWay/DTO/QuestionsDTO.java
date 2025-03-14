package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;


@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class QuestionsDTO //고객 질문을 관리하기 위한 DTO
{


    @Schema(description = "질문 Id", example = "dfsafdasf")
    private Long questionId; // Q&A 질문을 등록하기 위한 것

    @NotBlank(message = "ExpectionQnA cannot be empty")
    @Size(min = 5, max= 20, message = "예상 Q&A의 질문은 최소 다섯자리 이상에 20자리 이하로 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @Schema(description = "예상 질문", example = "새집증후군 신청 시 추가 요금은 대략 어떻게 정해지나요?")
    private  String ExpectionQnA; // 예상했던 Q&A 질문

    @NotBlank(message = "ExpectionQnA cannot be empty")
    @Size(min = 5, message = "예상 질문 코멘트는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @Schema(description = "예상 질문에 대한 답변", example = "평수에 따라 다르게 책정됩니다.")
    private String ExpectedComment; // 예상질문에 대한 해답
}
