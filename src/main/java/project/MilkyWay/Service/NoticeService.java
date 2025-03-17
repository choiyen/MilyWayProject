package project.MilkyWay.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.NoticeEntity;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.mapper.NoticeMapper;

import java.io.IOException;
import java.util.List;

@Service
public class NoticeService
{
   @Autowired
   NoticeMapper noticeMapper;

    public NoticeEntity InsertNotice(NoticeEntity noticeEntity)
   {
       noticeMapper.Insert(noticeEntity);
       NoticeEntity notice = noticeMapper.findByNoticeId(noticeEntity.getNoticeId());
       if(notice != null)
       {
           return notice;
       }
       else
       {
           throw new InsertFailedException("데이터베이스에 데이터를 추가 시키러고 시도했는데, 실패했나봐요ㅠㅠㅠ");
       }
   }
    public NoticeEntity UpdateNotice(String encodingNoticeId, NoticeEntity newNoticeEntity)
   {
       NoticeEntity OldNoticeEntity = noticeMapper.findByNoticeId(encodingNoticeId);
       if(OldNoticeEntity != null)
       {
           NoticeEntity newNoticeEntity2 = ChangeToNotice(OldNoticeEntity, newNoticeEntity);
           noticeMapper.Update(newNoticeEntity2);
           NoticeEntity SelectnewNoticeEntity = noticeMapper.findByNoticeId(encodingNoticeId);
           if(SelectnewNoticeEntity.getNoticeId().equals(newNoticeEntity2.getNoticeId()) && SelectnewNoticeEntity.getType().equals(newNoticeEntity2.getType())&&SelectnewNoticeEntity.getGreeting().equals(newNoticeEntity2.getGreeting()))
           {
               return SelectnewNoticeEntity;
           }
           else
           {
               throw new UpdateFailedException("데이터 수정을 시도할 수 있었는데, 수정엔 실패했네요. 관리자에게 문의하세요");
           }
       }
       else
       {
           throw new FindFailedException("해당 리뷰 정보에 해당하는 메인데이터를 못찾겠어요. 관리자에게 문의해줘요");
       }
   }
    public boolean DeleteByNoticeId(String encodingNoticeId) throws IOException {
        NoticeEntity noticeEntity = noticeMapper.findByNoticeId(encodingNoticeId);
        if(noticeEntity != null)
        {
            noticeMapper.deleteByNoticeId(encodingNoticeId);
            NoticeEntity noticeEntity1 = noticeMapper.findByNoticeId(encodingNoticeId);
            if(noticeEntity1 == null)
            {
                return true;
            }
            else
            {
                throw new DeleteFailedException("삭제를 시도했는데 데이터가 살아있네요ㅠㅠㅠㅠ");
            }
        }
        else
        {
            throw new FindFailedException("데이터를 지울려고 했는데, 후기 Id에 맞는 정보가 없네요");
        }
    }
    public List<NoticeEntity> findAll()
    {
        List<NoticeEntity> list = noticeMapper.findAll();
        if(!list.isEmpty())
        {
            return list;
        }
        else if(list.isEmpty())
        {
            throw new FindFailedException("list를 찾긴 찾았는데, 비어있어요");
        }
        else
        {
            throw new FindFailedException("리뷰 데이터를 찾는 도중, 알 수 없는 오류가 발생했어요");
        }
    }


    private NoticeEntity ChangeToNotice(NoticeEntity oldNoticeEntity, NoticeEntity newNoticeEntity)
    {
        NoticeEntity notice = NoticeEntity.builder()
                .NoticeId(oldNoticeEntity.getNoticeId())
                .type(newNoticeEntity.getType())
                .greeting(newNoticeEntity.getGreeting())
                .build();

        return notice;
    }


    public NoticeEntity findNoticeId(String noticeId)
    {
        NoticeEntity noticeEntity = noticeMapper.findByNoticeId(noticeId);
        if(noticeEntity == null)
        {
            throw new FindFailedException("NoticeId에 맞는 정보를 찾지 못했습니다.");
        }
        else
        {
            return noticeEntity;
        }
    }
}
