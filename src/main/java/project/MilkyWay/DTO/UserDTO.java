package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class UserDTO //관리자 아이디를 관리하는 DTO
{
    @NotNull(message = "UserId cannot be null")
    @NotBlank(message = "UserId cannot be empty")
    @Size(min = 5, max= 10, message = "아이디는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^(?!.*[가-힣])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}|\\[\\]:;\"'<>,.?/`~_-]).+$", message = "대소문자와 특수문자가 모두 포함된 문자열만 입력 가능하며, 한글은 입력할 수 없습니다.")
    @Schema(description = "관리자를 제어하기 위한 테이블", example = "cs1459")
    private String userID; //아이디

    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, max = 15, message = "비밀번호는 최소 5자리 이상의 숫자여야 함")
    @Pattern(regexp = "(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+={}|\\[\\]:;\"'<>,.?/`~_-]).+$", message = "대소문자와 특수문자가 모두 포함된 문자열만 입력 가능합니다.")
    @Schema(description = "관리자를 제어하기 위한 비밀번호", example = "asdZXC@123")
    private String Password; //비밀번호

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be empty")
    @Email(message = "email is Email Type(example : kons@sdffdf.com")
    @Schema(description = "관리자를 찾기 위한 이메일", example = "asdZXC147@naver.com")
    private String email; //비밀번호 찾기 구현을 위한 이메일
}
