package project.MilkyWay.DTO;

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
public class ReservationDTO //고객의 예약을 관리하기 위한 DTO
{

    String reservationId; //예약을 관리하기 위한 ID

    @NotNull(message = "administrationId cannot be null")
    @NotBlank(message = "administrationId cannot be empty")
    String administrationId;

    @NotNull(message = "acreage cannot be null")
    @NotBlank(message = "acreage cannot be empty")
    @Size(min = 5, max= 10, message = "acreage는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[가-힣0-9]+$", message = "acreage는 한글과 숫자만 입력 가능합니다.")
    String acreage;

    @NotNull(message = "roomcount cannot be null")
    @NotBlank(message = "roomcount cannot be empty")
    @Size(min = 5, max= 50, message = "Roomcount는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[가-힣0-9]+$", message = "roomcount는 한글과 숫자만 입력 가능합니다.")
    String roomcount; // 방/화장실/베란다 갯수를 기록하기 위한 것

    @NotNull(message = "name cannot be null")
    @NotBlank(message = "name cannot be empty")
    @Size(min = 5, max= 10, message = "이름은 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[가-힣0-9]+$", message = "name은 한글과 숫자만 입력 가능합니다.")
    private String name; // 고객의 이름

    @NotNull(message = "phone cannot be null")
    @NotBlank(message = "phone cannot be empty")
    @Size(min = 5, max= 12, message = "phone는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[0-9]+$", message = "숫자만 입력 가능합니다.")
    private String phone; // 전화번호

    @NotNull(message = "Address cannot be null")
    @NotBlank(message = "Address cannot be empty")
    @Size(min = 5, max= 10, message = "아이디는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    private String Address; // 주소(암호화 처리 필요)

    @NotNull(message = "SubissionDate cannot be null")
    @NotBlank(message = "SubissionDate cannot be empty")
    @Size(min = 5, max= 15, message = "아이디는 최소 다섯자리 이상 입력해야 함.")
    private Date SubissionDate; // 예약 날짜
}
