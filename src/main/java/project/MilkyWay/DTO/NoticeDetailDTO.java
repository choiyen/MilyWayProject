package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import project.MilkyWay.Enum.CleanType;
import project.MilkyWay.Enum.Cleandirection;
import project.MilkyWay.Enum.EnumValue;

import java.util.List;


@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class NoticeDetailDTO
{


    @Schema(description = "세부사항에 대한 Id", example = "5555")
    private Long NoticeDetailId; // 1씩 증가하는 auto inclement로 작성

    @NotBlank(message = "NoticeId cannot be empty")
    @Size(min = 5, max= 20, message = "NoticeId는 최소 다섯자리 이상 입력해야 함.")
    @Schema(description= "후기 정보 Id", example = "dfasfdsfsafasfwv!ED", required = true)
    private String NoticeId; // NoticeDTO와 연결하기 위한 왜래키

    @NotBlank(message = "direction cannot be empty")
    @Size(min = 5, max= 20, message = "direction는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @EnumValue(enumClass = Cleandirection.class, message = "청소 유형은 거실, 화장실, 부엌, 베란다 중 하나여야 합니다.")
    @Schema(description = "어느 유형의 방", example = "기실", required = true)
    private Cleandirection direction; // 방 위치 중에 어디? - 기실, 방, 화장실, 베란다
    //커스텀 어노테이션을 사용하여, 특정 값 외의 데이터가 들어왔을 떄, 에러 메세지를 반환함

    @NotBlank(message = "beforeURL cannot be empty")
    @Schema(description = "file 데이터 List", example = "file 데이터 List")
    private List<String> beforeURL; // 청소 전 사진

    @NotBlank(message = "afterURL cannot be empty")
    @Schema(description = "file 데이터 List", example = "file 데이터 List")
    private List<String> afterURL; // 청소 후 사진

    @NotBlank(message = "comment cannot be empty")
    @Size(min = 5, message = "comment는 최소 다섯자리 이상 입력해야 함.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]*$", message = "대소문자, 한글, 숫자만 입력 가능합니다.")
    @Schema(description = "청소 후 느낀 점", example = "이번에는 비교적 깨끗한 편이라 쉽게 마무리 지을 수 있었네요~~~~", required = true)
    String comment; // 해당 구역을 청소하고 느낀점 기록
}

/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */