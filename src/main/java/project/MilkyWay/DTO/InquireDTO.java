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
public class InquireDTO
{
    @ApiModelProperty(value = "게시판 정보 Id", example = "dfasfdsfsafasfwv!ED")
    private String inquireId;

    @NotNull(message = "Address cannot be null")
    @NotBlank(message = "Address cannot be empty")
    @Size(min = 5, message = "Address는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "문의 주소", example = "경상남도 진주시 석촌동", required = true)
    private String Address;

    @NotNull(message = "PhoneNumber cannot be null")
    @NotBlank(message = "PhoneNumber cannot be empty")
    @Size(min = 5, message = "PhoneNumber는  최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "휴대전화 번호", example = "111-111-1111", required = true)
    private String PhoneNumber;

    @NotNull(message = "Inquire cannot be null")
    @NotBlank(message = "Inquire cannot be empty")
    @Size(min = 5, message = "Inquire는  최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @ApiModelProperty(value = "문의 사항에 대한 내용", example = "예약하려는데, 19일에 가능한가요?", required = true)
    private String Inquire;

}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO