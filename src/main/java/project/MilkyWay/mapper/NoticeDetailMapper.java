package project.MilkyWay.mapper;


import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Entity.NoticeDetailEntity;
import project.MilkyWay.Entity.NoticeEntity;
import project.MilkyWay.Entity.ReservationEntity;

import java.util.List;

@Mapper
public interface NoticeDetailMapper
{
    List<NoticeDetailEntity> findByNoticeId(String NoticeId);
    NoticeDetailEntity findByNoticeDetailId(String NoticeDetailId);
    void deleteByNoticeDetailId(String NoticeDetailId);
    void Insert(NoticeDetailEntity noticeEntity);
    void Update(NoticeDetailEntity noticeEntity);

}
