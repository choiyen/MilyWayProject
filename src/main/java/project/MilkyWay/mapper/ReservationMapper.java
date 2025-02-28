package project.MilkyWay.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Entity.ReservationEntity;
import project.MilkyWay.Entity.UserEntity;

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
