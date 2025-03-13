package project.MilkyWay.DTO;

import io.swagger.annotations.ApiModelProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.Date;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class AdministrationDTO
{
    @ApiModelProperty(value = "일정 번호", example = "dfsdfwwf@!DASFXA")
    private String administrationId; //일정표를 관리하기 위한 id

    @NotNull(message = "administrationDate cannot be null")
    @NotBlank(message = "administrationDate cannot be empty")
    @Size(min = 5, message = "administrationDate는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "일정 날짜", example = "2025-03-14", required = true)
    private Date administrationDate; //일정을 기록할 id

    @NotNull(message = "adminstrationType cannot be null")
    @NotBlank(message = "adminstrationType cannot be empty")
    @Size(min = 5, message = "adminstrationType는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "일정 유형", example = "휴일", required = true)
    private String adminstrationType; // 일정의 유형 - 휴일, 일하는 날, 현재 비어있는 날
}
