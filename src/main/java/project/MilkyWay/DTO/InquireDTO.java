package project.MilkyWay.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class InquireDTO
{
    @Schema(description = "게시판 정보 Id", example = "dfasfdsfsafasfwv!ED")
    private String inquireId;

    @NotBlank(message = "Address cannot be empty")
    @Size(min = 5, message = "Address는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣\\s]*$", message = "주소는 대소문자, 한글, 숫자, 공백만 입력 가능합니다.")
    @Schema(description = "문의 주소", example = "경상남도 진주시 석촌동")
    @JsonProperty("address")
    private String address;

    @NotBlank(message = "PhoneNumber cannot be empty")
    @Size(min = 5, message = "PhoneNumber는  최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[0-9-]*$", message = "전화번호는 숫자, 하이픈만 입력 가능합니다.")
    @Schema(description = "휴대전화 번호", example = "111-111-1111")
    @JsonProperty("phoneNumber")
    private String phoneNumber;

    @NotBlank(message = "Inquire cannot be empty")
    @Size(min = 5, message = "Inquire는  최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣\\s!?.]*$", message = "문의는 대소문자, 한글, 숫자, 공백, 느낌표, 물음표만 입력 가능합니다.")
    @Schema(description = "문의 사항에 대한 내용", example = "예약하려는데, 19일에 가능한가요?")
    @JsonProperty("inquire")
    private String inquire;

}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO