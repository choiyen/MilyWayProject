package project.MilkyWay.noticeMain.Notice.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.noticeMain.Notice.Entity.NoticeEntity;

import java.util.List;

@Mapper
public interface NoticeMapper
{
    List<NoticeEntity> findAll();
    NoticeEntity findByNoticeId(String NoticeId);
    void deleteByNoticeId(String NoticeId);



    void Insert(NoticeEntity noticeEntity);
    void Update(NoticeEntity noticeEntity);

}
