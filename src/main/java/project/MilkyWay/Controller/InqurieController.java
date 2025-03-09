package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.InquireDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.InquireEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.InqurieRepository;
import project.MilkyWay.Service.InquireService;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/inqurie")
public class InqurieController
{
    @Autowired
    InquireService inquireService;
    
    ResponseDTO responseDTO = new ResponseDTO<>();

    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@RequestBody InquireDTO inquireDTO)
    {
        try
        {
            InquireEntity inquireEntity1 = ConvertToEntity(inquireDTO);
            InquireEntity inquireEntity2 = inquireService.Insert(inquireEntity1);
            if (inquireEntity2 != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 추가에 성공했습니다.", Collections.singletonList(inquireEntity2)));
            }
            else
            {
                throw new InsertFailedException();
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error","에러가 발생함"));
        }
    }
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@RequestBody InquireDTO inquireDTO)
    {
        try
        {
            InquireEntity inquireEntity1 = ConvertToEntity(inquireDTO);
            InquireEntity inquireEntity2 = inquireService.Update(inquireEntity1.getInquireId(), inquireEntity1);
            if (inquireEntity2 != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 업데이트에 성공했습니다.", Collections.singletonList(inquireEntity2)));
            }
            else
            {
                throw new UpdateFailedException();
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String EncodingInqurieId)
    {
        try
        {
            boolean bool = inquireService.Delete(EncodingInqurieId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 삭제에 성공했습니다."));
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

    @GetMapping("/ALL")
    public ResponseEntity<?> FindALL()
    {
        try
        {
            List<InquireEntity> inquireEntities = inquireService.findAll();
            return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 조회에 성공했습니다.", inquireEntities));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }
    private InquireEntity ConvertToEntity(InquireDTO inquireDTO)
    {
        return InquireEntity.builder()
                .inquireId(inquireDTO.getInquireId())
                .Address(inquireDTO.getAddress())
                .SubmissionDate(inquireDTO.getSubmissionDate())
                .PhoneNumber(inquireDTO.getPhoneNumber())
                .build();
    }


}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO