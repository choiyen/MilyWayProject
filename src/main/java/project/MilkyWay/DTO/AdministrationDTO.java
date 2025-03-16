package project.MilkyWay.DTO;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import project.MilkyWay.Enum.DateType;
import project.MilkyWay.Enum.EnumValue;
import project.MilkyWay.Enum.UserType;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Builder
@EqualsAndHashCode
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@ToString
public class AdministrationDTO
{
    @Schema(description = "일정 번호", example = "dfsdfwwf@!DASFXA")
    private String administrationId; //일정표를 관리하기 위한 id

    @Schema(description = "일정 날짜", example = "2025-03-14")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate administrationDate; //일정을 기록할 id

    @Schema(description = "일정 유형", example = "휴일")
    @EnumValue(enumClass = DateType.class, message = "허용되지 않은 일정 타입입니다.")
    private DateType adminstrationType; // 일정의 유형 - 휴일, 일하는 날, 현재 비어있는 날
}
