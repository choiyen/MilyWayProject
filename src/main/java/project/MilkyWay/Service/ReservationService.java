package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Entity.ReservationEntity;
import project.MilkyWay.Enum.DateType;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.mapper.ReservationMapper;


import java.util.List;


@Service
public class ReservationService //고객의 예약을 관리하기 위한 DTO
{
    @Autowired
    ReservationMapper reservationMapper;

    @Autowired
    AdministrationService administrationService;

    public ReservationEntity SelectAdminstrationID(String AdiminstrationId)
    {
        ReservationEntity reservationEntity = reservationMapper.findByAdministrationId(AdiminstrationId);
        if(reservationEntity != null)
        {
            return reservationEntity;
        }
        else
        {
            throw new FindFailedException("그 날짜에 해당하는 예약 정보를 찾을 수 없습니다.");
        }
    }

    public ReservationEntity InsertReservation(ReservationEntity reservationEntity)
    {


        boolean bool = administrationService.exists(reservationEntity.getAdministrationId());
        if(!bool)
        {
            AdministrationEntity administrationEntity = AdministrationEntity.builder()
                    .administrationId(reservationEntity.getAdministrationId())
                    .adminstrationType(DateType.일하는날)
                    .administrationDate(reservationEntity.getSubissionDate())
                    .build();
            administrationService.Update(administrationEntity);
        }
        reservationMapper.Insert(reservationEntity);
        ReservationEntity reservationEntity1 = reservationMapper.findByReservationId(reservationEntity.getReservationId());
        if(reservationEntity1 != null)
        {
            return reservationEntity1;
        }
        else
        {
            throw new FindFailedException("해당 코드를 가진 예약 데이터가 존재하지 않습니다.");
        }
    }
    public boolean DeleteReservation(String reservationId) {
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
                throw new DeleteFailedException("삭제를 시도했는데 아직 데이터가 살아있네요.");
            }
        }
        else
        {
            throw new FindFailedException("삭제하려고 데이터를 찾으려 했는데 없네요????");
        }

    }
    public ReservationEntity SaveReservation(ReservationEntity reservationEntity)
    {


            if(administrationService.existsByDate(reservationEntity.getSubissionDate()))
            {
                throw new InsertFailedException("해당 날짜에는 일정이 존재하기에 변경할 수 없습니다.");
            }
            else
            {
                ReservationEntity Oldreservation = reservationMapper.findByReservationId(reservationEntity.getReservationId());
                if(Oldreservation != null)
                {
                    ReservationEntity ChangeReservation = ChangeReservation(Oldreservation, reservationEntity);
                    AdministrationEntity administrationEntity = AdministrationEntity
                            .builder()
                            .administrationId(Oldreservation.getAdministrationId())
                            .adminstrationType(DateType.일하는날)
                            .administrationDate(reservationEntity.getSubissionDate())
                            .build();
                    AdministrationEntity administration = administrationService.Update(administrationEntity);

                    if(administration == null)
                    {
                        throw new UpdateFailedException("일정 정보 업데이트 도중 오류가 발생했습니다.");
                    }
                    else
                    {
                        reservationMapper.Update(ChangeReservation);
                        ReservationEntity reservationEntity2 = reservationMapper.findByReservationId(ChangeReservation.getReservationId());
                        boolean check = reservationEntity2.equals(ChangeReservation);
                        if(check)
                        {
                            return reservationEntity2;
                        }
                        else
                        {
                            throw new UpdateFailedException("예약 데이터 업데이트에 실패하였습니다. 관리자에게 문의해주세요");
                        }
                    }
                }
                else
                {
                    throw new UpdateFailedException("예약 데이터 저장에 실패하였습니다. 관리자에게 문의해주세요.");
                }
            }
    }
    public ReservationEntity ReservationSelect(String reservationId)
    {
        return reservationMapper.findByReservationId(reservationId);
    }
    public List<ReservationEntity> ListReservation()
    {
        return reservationMapper.findAll();
    }
    private ReservationEntity ChangeReservation(ReservationEntity OldReservation, ReservationEntity newReservation)
    {
        return ReservationEntity.builder()
                .administrationId(OldReservation.getAdministrationId())
                .SubissionDate(newReservation.getSubissionDate())
                .name(newReservation.getName())
                .acreage(newReservation.getAcreage())
                .Address(newReservation.getAddress())
                .phone(newReservation.getPhone())
                .build();
    }


}
