package project.MilkyWay.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import project.MilkyWay.Enum.CleanType;
import project.MilkyWay.Enum.EnumValue;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class NoticeDTO
{
    private String NoticeId; // 후기 ID : primary key이자 10자리의 렌덤키

    @NotNull(message = "type cannot be null")
    @NotBlank(message = "type cannot be empty")
    @Size(min = 5, max= 20, message = "ExpectionQnA는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[0-9가-힣]*$", message = "한글, 숫자만 입력 가능합니다.")
    @EnumValue(enumClass = CleanType.class, message = "청소 유형은 '입주청소', '이사청소', '주거청소' 중 하나여야 합니다.")
    private CleanType type; // 어떤 유형의 일 : 이사청소, 입주청소, 주거청소.....

    @NotNull(message = "greeting cannot be null")
    @NotBlank(message = "greeting cannot be empty")
    @Size(min = 5, max= 20, message = "greeting는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    private String greeting;
}
