package project.MilkyWay.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.*;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Entity.ReservationEntity;
import project.MilkyWay.Enum.DateType;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Service.AdministrationService;
import project.MilkyWay.Service.ReservationService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/reservation")
@Tag(name = "reservation 정보를 제공하는 Controller")
public class ReservationController //고객의 예약을 관리하기 위한 DTO
{
    @Autowired
    ReservationService reservationService;

    ResponseDTO<ReservationDTO> responseDTO = new ResponseDTO<>();

    @Autowired
    AdministrationService administrationService;



    @Operation(
            summary = "Create a new reservation",  // Provide a brief summary
            description = "This API creates a new reservation and returns reservationDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "reservation created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input data"
                    )
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@RequestBody @Valid ReservationDTO reservationDTO) {
        try
        {
            AdministrationEntity administration = administrationService.FindByAdministration(reservationDTO.getAdministrationId());
            if(administration.getAdminstrationType() == DateType.일하는날)
            {
                throw new InsertFailedException("다른 일정이 있는 것 같으니, 일정 표를 확인해주세요");
            }
            else
            {
                ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
                ReservationEntity reservationEntity2 = reservationService.InsertReservation(reservationEntity);
                if (reservationEntity2 != null)
                {
                    ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 추가에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
                } else {
                    throw new InsertFailedException();
                }
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", "예약 데이터 추가에 실패했습니다."));
        }
    }


    @Operation(
            summary = "Change a ReservationDTO by ReservationId",  // Provide a brief summary
            description = "This API Change a Reservation and returns ReservationDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Reservation Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@RequestBody @Valid ReservationDTO reservationDTO) {
        try
        {
            ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
            ReservationEntity reservationEntity2 = reservationService.SaveReservation(reservationEntity);
            if (reservationEntity2 != null) {
                ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 추가에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
            } else {
                throw new InsertFailedException();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Delete an Reservation by ReservationId",  // Provide a brief summary
            description = "This API deletes an Reservation by the provided ReservationId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Reservation deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Reservation not found"
                    )
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String ReservationId) {
        try {
            boolean bool = reservationService.DeleteReservation(ReservationId);
            if (bool) {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 삭제에 성공하였습니다."));
            } else {
                throw new DeleteFailedException();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns a list of ReservationDTO objects",
            description = "This API retrieves a list of ReservationDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reservation List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Reservation List not found")
            }
    )
    @GetMapping("/Find")
    public ResponseEntity<?> FindAll() {
        try {
            List<ReservationEntity> reservationEntities = reservationService.ListReservation();
            List<ReservationDTO> reservationDTOS = new ArrayList<>();
            for (ReservationEntity reservationEntity : reservationEntities) {
                reservationDTOS.add(ConvertToDTO(reservationEntity));
            }
            if (reservationDTOS.isEmpty()) {
                throw new FindFailedException("데이터 찾기를 시도했는데, 비어있어요ㅠㅠㅠ");
            } else {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 조회에 성공했습니다.", reservationDTOS));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @GetMapping("/FindBy")
    public ResponseEntity<?> FindBy(@RequestParam String ReservationId) {
        try {
            ReservationEntity reservationEntity = reservationService.ReservationSelect(ReservationId);
            if (reservationEntity == null) {
                throw new FindFailedException("결과를 찾을 수 없습니다.");
            } else {
                ReservationDTO reservationDTO = ConvertToDTO(reservationEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료", Collections.singletonList(reservationDTO)));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @GetMapping
    ResponseEntity<?> FindByAdmin(@RequestParam String AdminstrationId)
    {
        try {
            ReservationEntity reservationEntity = reservationService.SelectAdminstrationID(AdminstrationId);
            if (reservationEntity == null) {
                throw new FindFailedException("결과를 찾을 수 없습니다.");
            } else {
                ReservationDTO reservationDTO = ConvertToDTO(reservationEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료", Collections.singletonList(reservationDTO)));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    private ReservationDTO ConvertToDTO(ReservationEntity reservationEntity2)
    {
        return ReservationDTO.builder()
                .reservationId(reservationEntity2.getReservationId())
                .administrationId(reservationEntity2.getReservationId())
                .phone(reservationEntity2.getPhone())
                .Address(reservationEntity2.getAddress())
                .name(reservationEntity2.getName())
                .acreage(reservationEntity2.getAcreage())
                .SubissionDate(reservationEntity2.getSubissionDate())
                .build();
    }

    private ReservationEntity ConvertToEntity(ReservationDTO reservationDTO)
    {
        return ReservationEntity.builder()
                .reservationId(reservationDTO.getReservationId())
                .administrationId(reservationDTO.getAdministrationId())
                .phone(reservationDTO.getPhone())
                .Address(reservationDTO.getAddress())
                .name(reservationDTO.getName())
                .acreage(reservationDTO.getAcreage())
                .SubissionDate(reservationDTO.getSubissionDate())
                .build();
    }
}
