package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
public class ReservationController //고객의 예약을 관리하기 위한 DTO
{
    @Autowired
    ReservationService reservationService;

    ResponseDTO responseDTO = new ResponseDTO<>();

    public ResponseEntity<?> Insert(@RequestBody ReservationDTO reservationDTO)
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
    public ResponseEntity<?> Update(@RequestBody ReservationDTO reservationDTO)
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
    public ResponseEntity<?> Delete(@RequestBody String EncodingReservationId)
    {
      try
      {
          boolean bool = reservationService.DeleteReservation(EncodingReservationId);
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
