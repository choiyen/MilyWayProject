package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.InquireEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.InqurieRepository;

import java.util.List;


@Service
public class InquireService
{
    @Autowired
    InqurieRepository inqurieRepository;

    public InquireEntity Insert(InquireEntity inquireEntity)
    {
        InquireEntity inquireEntity1 = inqurieRepository.save(inquireEntity);
        if(inquireEntity1 != null)
        {
            return inquireEntity1;
        }
        else
        {
            throw new InsertFailedException("날짜 가능 문의 등록이 실패하였습니다.");
        }
    }
    public InquireEntity Update(String encodinginquireId,InquireEntity inquireEntity)
    {
        InquireEntity inquireEntity1 = inqurieRepository.findByInquireId(encodinginquireId);
        if(inquireEntity1 != null)
        {
            InquireEntity newinquireEntity2 = ConvertToNew(inquireEntity1, inquireEntity);
            InquireEntity inquireEntity2 = inqurieRepository.save(newinquireEntity2);
            InquireEntity saveinquire = inqurieRepository.findByInquireId(newinquireEntity2.getInquireId());
            if(saveinquire.equals(inquireEntity2))
            {
                return inquireEntity2;
            }
            else
            {
                throw new UpdateFailedException("inquire 클래스의 변경을 시도했으나, 변경되지 않았습니다.");
            }
        }
        else
        {
            throw new FindFailedException("수정할 질문 내역을 찾지 못하였습니다.");
        }
    }
    public InquireEntity FindByInquireId(String encodingInquireId)
    {
        InquireEntity inquireEntity = inqurieRepository.findByInquireId(encodingInquireId);
        if(inquireEntity != null)
        {
            return inquireEntity;
        }
        else
        {
            throw new FindFailedException("InqireId에 따른 정보를 찾지 못했습니다. 오류 발생!!");
        }
    }
    private boolean existByinquireId(String inquireId)
    {
        return inqurieRepository.existsByInquireId(inquireId);
    }
    public List<InquireEntity> findAll()
    {
        List<InquireEntity> list = inqurieRepository.findAll();
        if(list != null)
        {
            return list;
        }
        else if(list.isEmpty())
        {
            throw new FindFailedException("조회에는 성공했는데, 관련 데이터가 없습니다.");
        }
        else
        {
            throw new FindFailedException("알 수 없는 오류로 데이터 조회에 실패하였습니다.");
        }
    }
    public boolean Delete(String encodingInquireId)
    {
        try
        {
            inqurieRepository.deleteByInquireId(encodingInquireId);
            boolean bool = existByinquireId(encodingInquireId);
            if(bool)
            {
                throw new DeleteFailedException("데이터 삭제에 실패한 것 같아요. 다시 시도해주세요.");
            }
            else
            {
              return false;
            }
        }
        catch (Exception e)
        {
            throw new DeleteFailedException("데이터 삭제에 실패하였습니다.");
        }
    }
    private InquireEntity ConvertToNew(InquireEntity oldinquireEntity, InquireEntity newinquireEntity)
    {
        return InquireEntity.builder()
                .inquireId(oldinquireEntity.getInquireId())
                .Inquire(newinquireEntity.getInquire())
                .PhoneNumber(newinquireEntity.getPhoneNumber())
                .Address(newinquireEntity.getAddress())
                .build();
    }

}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO