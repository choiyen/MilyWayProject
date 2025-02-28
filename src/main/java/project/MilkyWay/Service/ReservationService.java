package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.ReservationEntity;
import project.MilkyWay.mapper.ReservationMapper;

import java.io.IOException;
import java.util.List;


@Service
public class ReservationService //고객의 예약을 관리하기 위한 DTO
{
    @Autowired
    ReservationMapper reservationMapper;

    public ReservationEntity SelectAdminstrationID(String AdiminstrationId)
    {
        ReservationEntity reservationEntity = reservationMapper.findByAdministrationId(AdiminstrationId);
        if(reservationEntity != null)
        {
            return reservationEntity;
        }
        else
        {
            throw new RuntimeException("그 날짜에 해당하는 예약 정보를 찾을 수 없습니다.");
        }
    }

    public ReservationEntity InsertReservation(ReservationEntity reservationEntity)
    {
        reservationMapper.Insert(reservationEntity);
        ReservationEntity reservationEntity1 = reservationMapper.findByReservationId(reservationEntity.getReservationId());
        if(reservationEntity1 != null)
        {
            return reservationEntity1;
        }
        else
        {
            throw new RuntimeException("해당 코드를 가진 예약 데이터가 존재하지 않습니다.");
        }
    }
    public boolean DeleteReservation(String reservationId) throws IOException {
        ReservationEntity reservationEntity1 = reservationMapper.findByReservationId(reservationId);
        if(reservationEntity1 != null)
        {
            reservationMapper.deleteByReservationId(reservationId);
            ReservationEntity reservationEntity2 = reservationMapper.findByReservationId(reservationId);
            if(reservationEntity2 == null)
            {
                return true;
            }
            else
            {
                throw new IOException("삭제를 시도했는데 아직 데이터가 살아있네요.");
            }
        }
        else
        {
            throw new RuntimeException("삭제하려고 데이터를 찾으려 했는데 없네요????");
        }

    }
    public boolean SaveReservation(ReservationEntity reservationEntity)
    {
        ReservationEntity reservationEntity1 = reservationMapper.findByReservationId(reservationEntity.getReservationId());
        if(reservationEntity1 != null)
        {
            ReservationEntity ChangeReservation = ChangeReservation(reservationEntity1, reservationEntity);
            reservationMapper.Update(ChangeReservation);
            ReservationEntity reservationEntity2 = reservationMapper.findByReservationId(ChangeReservation.getReservationId());
            boolean check = reservationEntity2.equals(ChangeReservation);
            if(check == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        else
        {
            throw new RuntimeException("예약 데이터 저장에 실패하였습니다. 관리자에게 문의해주세요.");
        }
    }
    public ReservationEntity ReservationSelect(String reservationId)
    {
        ReservationEntity reservationEntity = reservationMapper.findByReservationId(reservationId);
        return reservationEntity;
    }
    public List<ReservationEntity> ListReservation()
    {
        List<ReservationEntity> list = reservationMapper.findAll();
        return list;
    }
    private ReservationEntity ChangeReservation(ReservationEntity OldReservation, ReservationEntity newReservation)
    {
        ReservationEntity reservationEntity = ReservationEntity.builder()
                .administrationId(OldReservation.getAdministrationId())
                .SubissionDate(newReservation.getSubissionDate())
                .name(newReservation.getName())
                .acreage(newReservation.getAcreage())
                .roomcount(newReservation.getRoomcount())
                .Address(newReservation.getAddress())
                .phone(newReservation.getPhone())
                .build();
        return reservationEntity;
    }


}
