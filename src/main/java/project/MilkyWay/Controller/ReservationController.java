package project.MilkyWay.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.BoardDTO;
import project.MilkyWay.DTO.CommentDTO;
import project.MilkyWay.DTO.ReservationDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.ReservationEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Service.ReservationService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/reservation")
@Api(tags = {"reservation 정보를 제공하는 Controller"})
public class ReservationController //고객의 예약을 관리하기 위한 DTO
{
    @Autowired
    ReservationService reservationService;

    ResponseDTO responseDTO = new ResponseDTO<>();


    @ApiOperation(
            value = "Create a new reservation",
            response = CommentDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API creates a new reservation and returns reservationDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "reservation created successfully"),
            @ApiResponse(code = 400, message = "Invalid input data")
    })
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody ReservationDTO reservationDTO)
    {
        try
        {
            ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
            ReservationEntity reservationEntity2 = reservationService.InsertReservation(reservationEntity);
            if(reservationEntity2 != null)
            {
                ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 추가에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
            }
            else
            {
                throw new InsertFailedException();
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error","예약 데이터 추가에 실패했습니다."));
        }
    }

    @ApiOperation(
            value = "Change a ReservationDTO by ReservationId",
            response = BoardDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API Change a Reservation and returns ReservationDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Reservation Changed successfully"),
            @ApiResponse(code = 400, message = "Invalid Change data")
    })
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody ReservationDTO reservationDTO)
    {
        try
        {
            ReservationEntity reservationEntity = ConvertToEntity(reservationDTO);
            ReservationEntity reservationEntity2 = reservationService.SaveReservation(reservationEntity);
            if(reservationEntity2 != null)
            {
                ReservationDTO reservationDTO1 = ConvertToDTO(reservationEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 추가에 성공하였습니다.", Collections.singletonList(reservationDTO1)));
            }
            else
            {
                throw new InsertFailedException();
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }


    @ApiOperation(
            value = "Delete an Reservation by ReservationId",
            response = ResponseEntity.class,  // 반환 타입을 ResponseEntity로 지정
            notes = "This API deletes an Reservation by the provided ReservationId and returns a ResponseEntity with a success or failure message."
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Reservation deleted successfully"),
            @ApiResponse(code = 404, message = "Reservation not found")
    })
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String ReservationId)
    {
      try
      {
          boolean bool = reservationService.DeleteReservation(ReservationId);
          if(bool)
          {
              return ResponseEntity.ok().body(responseDTO.Response("success","데이터 삭제에 성공하였습니다."));
          }
          else
          {
              throw new DeleteFailedException();
          }
      }
      catch (Exception e)
      {
          return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
      }
    }


    @GetMapping
    public ResponseEntity<?> FindAll()
    {
        try
        {
            List<ReservationEntity> reservationEntities = reservationService.ListReservation();
            List<ReservationDTO> reservationDTOS = new ArrayList<>();
            for(ReservationEntity reservationEntity : reservationEntities)
            {
                reservationDTOS.add(ConvertToDTO(reservationEntity));
            }
            if(reservationDTOS.isEmpty())
            {
                throw new FindFailedException("데이터 찾기를 시도했는데, 비어있어요ㅠㅠㅠ");
            }
            else
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 조회에 성공했습니다.",reservationDTOS));
            }
        } 
        catch (Exception e) 
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
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
                .roomcount(reservationEntity2.getRoomcount())
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
                .roomcount(reservationDTO.getRoomcount())
                .acreage(reservationDTO.getAcreage())
                .SubissionDate(reservationDTO.getSubissionDate())
                .build();
    }
}
