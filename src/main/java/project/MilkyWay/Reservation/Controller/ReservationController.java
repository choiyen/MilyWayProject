package project.MilkyWay.Reservation.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.ComonType.Expection.*;
import project.MilkyWay.ComonType.LoginSuccess;
import project.MilkyWay.Question.DTO.QuestionsDTO;
import project.MilkyWay.Reservation.Entity.ReservationEntity;
import project.MilkyWay.Administration.Service.AdministrationService;
import project.MilkyWay.Reservation.DTO.ReservationDTO;
import project.MilkyWay.Reservation.Service.ReservationService;

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

    LoginSuccess loginSuccess = new LoginSuccess();

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

                ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
                ReservationEntity reservationEntity2 = reservationService.InsertReservation(reservationEntity);
                if (reservationEntity2 != null)
                {
                    ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 추가에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
                }
                else
                {
                    throw new InsertFailedException();
                }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }//테스트 완료 : 단, 사용자가 예약을 하고, 예약정보를 확인한 후, 승인이 되었을 떄, 일정 정보에 추가하는 형태로 바꿀 지는 고민 필요.


    @Operation(
            summary = "Change a ReservationDTO by ReservationId , but only if the user is an administrator.",  // Provide a brief summary
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
    public ResponseEntity<?> Update(HttpServletRequest request, @RequestBody @Valid ReservationDTO reservationDTO) {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
                ReservationEntity reservationEntity2 = reservationService.SaveReservation(reservationEntity);
                System.out.println(reservationEntity2);
                if (reservationEntity2 != null) {
                    ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 수정에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
                }
                else
                {
                    throw new UpdateFailedException("고객 예약 정보 업데이트 도중 오류 발생, 관리자에게 문의하세요");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객의 예약 정보 수정은 관리자의 몫입니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Delete an Reservation by ReservationId , but only if the user is an administrator.",  // Provide a brief summary
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
    public ResponseEntity<?> Delete(HttpServletRequest request, @RequestParam String ReservationId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                boolean bool = reservationService.DeleteReservation(ReservationId);
                if (bool)
                {
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 삭제에 성공하였습니다."));
                }
                else
                {
                    throw new DeleteFailedException();
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객 예약 정보 삭제는 관리자 로그인이 필요합니다.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns a list of ReservationDTO objects, but only if the user is an administrator.",
            description = "This API retrieves a list of ReservationDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Reservation List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Reservation List not found")
            }
    )
    @GetMapping("/Find")
    public ResponseEntity<?> FindAll(HttpServletRequest request)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
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
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객 정보의 확인은 관리자의 로그인을 필요로 합니다.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns ReservationDTO object for a given ReservationId ",
            description = "This API retrieves an Reservation based on the provided Reservation Id and returns the corresponding ReservationDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ReservationDTO found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(responseCode = "404", description = "ReservationDTO not found")
            }
    )
    @GetMapping("/FindBy")
    public ResponseEntity<?> FindBy(HttpServletRequest request, @RequestParam String ReservationId)
    {

        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                ReservationEntity reservationEntity = reservationService.ReservationSelect(ReservationId);
                if (reservationEntity == null) {
                    throw new FindFailedException("결과를 찾을 수 없습니다.");
                } else {
                    ReservationDTO reservationDTO = ConvertToDTO(reservationEntity);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료", Collections.singletonList(reservationDTO)));
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객 정보는 관리자 로그인이 없으면 확인하지 못하도록 보호되어 있습니다.");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Returns ReservationDTO object for a given AdminstrationId ",
            description = "This API retrieves an Reservation based on the provided AdminstrationId and returns the corresponding ReservationDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "ReservationDTO found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(responseCode = "404", description = "ReservationDTO not found")
            }
    )
    @GetMapping("/FindByAdmin")
    ResponseEntity<?> FindByAdmin(HttpServletRequest request, @RequestParam String AdminstrationId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                ReservationEntity reservationEntity = reservationService.SelectAdminstrationID(AdminstrationId);
                if (reservationEntity == null)
                {
                    throw new FindFailedException("결과를 찾을 수 없습니다.");
                }
                else
                {
                    ReservationDTO reservationDTO = ConvertToDTO(reservationEntity);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료", Collections.singletonList(reservationDTO)));
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 로그인 정보가 없는 상태에서 고객 예약 정보는 확인 불가합니다.");
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
                .address(reservationEntity2.getAddress())
                .name(reservationEntity2.getName())
                .acreage(reservationEntity2.getAcreage())
                .subissionDate(reservationEntity2.getSubissionDate())
                .build();
    }

    private ReservationEntity ConvertToEntity(ReservationDTO reservationDTO)
    {
        return ReservationEntity.builder()
                .reservationId(reservationDTO.getReservationId())
                .administrationId(reservationDTO.getAdministrationId())
                .phone(reservationDTO.getPhone())
                .address(reservationDTO.getAddress())
                .name(reservationDTO.getName())
                .acreage(reservationDTO.getAcreage())
                .subissionDate(reservationDTO.getSubissionDate())
                .build();
    }
}
