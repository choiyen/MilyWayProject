package project.MilkyWay.Reservation.Mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Reservation.Entity.ReservationEntity;

import java.util.List;

@Mapper
public interface ReservationMapper
{
    List<ReservationEntity> findAll();
    ReservationEntity findByAdministrationId(String administrationId);
    ReservationEntity findByReservationId(String reservationId);
    void deleteByReservationId(String reservationId);
    void Insert(ReservationEntity reservationEntity);
    void Update(ReservationEntity reservationEntity);
}
