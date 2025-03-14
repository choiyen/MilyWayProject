package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.NoticeDetailEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.mapper.NoticeDetailMapper;


import java.util.List;


@Service
public class NoticeDetailService {
    @Autowired
    NoticeDetailMapper noticeDetailMapper;

    public NoticeDetailEntity InsertNoticeDetallMapper(NoticeDetailEntity newNoticeDetailEntity) {
        noticeDetailMapper.Insert(newNoticeDetailEntity);
        NoticeDetailEntity noticeDetailEntity = noticeDetailMapper.findByNoticeDetailId(newNoticeDetailEntity.getNoticeDetailId());
        if (noticeDetailEntity != null) {
            return noticeDetailEntity;
        } else {
            throw new InsertFailedException("데이터를 추가 시키려고 시도했는데, 실패했나봐요");
        }
    }

    public NoticeDetailEntity UpdateNoticeDetailMapper(Long encodingNoticeDetailId, NoticeDetailEntity ChangingNoticeDetailEntity)
    {
        NoticeDetailEntity OldNoticeDetailEntity = noticeDetailMapper.findByNoticeDetailId(encodingNoticeDetailId);

        if (OldNoticeDetailEntity != null) {
            NoticeDetailEntity newNoticeDetailEntity2 = ChangeToNoticeDetail(OldNoticeDetailEntity, ChangingNoticeDetailEntity);
            noticeDetailMapper.Update(newNoticeDetailEntity2);
            NoticeDetailEntity SelectnewNoticeEntity = noticeDetailMapper.findByNoticeDetailId(encodingNoticeDetailId);
            if (SelectnewNoticeEntity.equals(newNoticeDetailEntity2))
            {
                return SelectnewNoticeEntity;
            }
            else
            {
                throw new FindFailedException("데이터 수정을 시도할 수 있었는데, 수정엔 실패했네요. 관리자에게 문의하세요");
            }
        }
        return ChangingNoticeDetailEntity;
    }

    public List<NoticeDetailEntity> ListNoticeDetail(String encodingNoticeId)
    {
        List<NoticeDetailEntity> list = noticeDetailMapper.findByNoticeId(encodingNoticeId);
        if(list.isEmpty())
        {
            throw new FindFailedException("데이터를 찾았어요. 근데 비어있는 것 같아요");
        }
        else if(!list.isEmpty())
        {
            return list;
        }
        else
        {
            throw new FindFailedException("데이터 찾기를 시도했는데, 알 수 없는 오류가 발생했어요. 관리자에게 문의해줘요");
        }
    }
    public boolean DeleteToNoticeDetail(Long encodingNoticeDetail)
    {
        NoticeDetailEntity seach = noticeDetailMapper.findByNoticeDetailId(encodingNoticeDetail);
        if(seach != null)
        {
            noticeDetailMapper.deleteByNoticeDetailId(encodingNoticeDetail);
            NoticeDetailEntity noticeDetailEntity = noticeDetailMapper.findByNoticeDetailId(encodingNoticeDetail);
            if(noticeDetailEntity == null)
            {
                return true;
            }
            else
            {
                throw new DeleteFailedException("데이터베이스에서 삭제하는데 실패한 것 같아요. 관리자에게 문의해줘요");
            }
        }
        else
        {
          throw  new RuntimeException("데이터베이스에서 삭제할 데이터를 못찾겠어요. 관리자에게 문의해주세요.");
        }
    }

    private NoticeDetailEntity ChangeToNoticeDetail(NoticeDetailEntity oldNoticeDetailEntity, NoticeDetailEntity changingNoticeDetailEntity)
    {
        NoticeDetailEntity noticeDetailEntity = NoticeDetailEntity.builder()
                .NoticeDetailId(oldNoticeDetailEntity.getNoticeDetailId())
                .NoticeId(oldNoticeDetailEntity.getNoticeId())
                .afterURL(changingNoticeDetailEntity.getAfterURL())
                .beforeURL(changingNoticeDetailEntity.getBeforeURL())
                .direction(changingNoticeDetailEntity.getDirection())
                .comment(changingNoticeDetailEntity.getComment())
                .build();

        return noticeDetailEntity;

    }
}

/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */