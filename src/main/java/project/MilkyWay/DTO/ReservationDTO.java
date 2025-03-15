package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
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
public class ReservationDTO //고객의 예약을 관리하기 위한 DTO
{

    @Schema(description = "예약을 관리하기 위한 ID", example = "dfsfsfadf@!FSCVS")
    String reservationId; //예약을 관리하기 위한 ID

    @NotBlank(message = "administrationId cannot be empty")
    @Schema(description = "예약일정을 관리하기 위한 Id", example = "2024-10-11") //예약 일정이 있어야 들어가는 게 아니라, 예약 일정이 없다면 생성하고, 데이터 추가 작업 수행
    String administrationId;

    @NotBlank(message = "acreage cannot be empty")
    @Size(min = 5, max= 10, message = "acreage는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[가-힣0-9]+$", message = "acreage는 한글과 숫자만 입력 가능합니다.")
    @Schema(description = "실 평수", example = "25평")
    String acreage;

    @NotBlank(message = "name cannot be empty")
    @Size(min = 5, max= 10, message = "이름은 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[가-힣0-9]+$", message = "name은 한글과 숫자만 입력 가능합니다.")
    @Schema(description = "예약 고객의 이름", example = "홍길성")
    private String name; // 고객의 이름

    @NotBlank(message = "phone cannot be empty")
    @Size(min = 5, max= 12, message = "phone는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력 가능합니다.")
    @Schema(description = "예약 고객의 전화번호", example = "010-1111-1111")
    private String phone; // 전화번호

    @NotBlank(message = "Address cannot be empty")
    @Size(min = 5, max= 10, message = "아이디는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @Schema(description = "고객 주소", example = "한국시 아주동 한국파크 101동 4121호")
    private String Address; // 주소(암호화 처리 필요)

    @NotBlank(message = "SubissionDate cannot be empty")
    @Size(min = 5, max= 15, message = "아이디는 최소 다섯자리 이상 입력해야 함.")
    @Schema(description = "예약 날짜", example = "2025-03-14")
    private Date SubissionDate; // 예약 날짜
}
