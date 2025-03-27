package project.MilkyWay.noticeMain.Notice.Controller;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.noticeMain.Common.NoticeJsonDTO;
import project.MilkyWay.noticeMain.Notice.DTO.NoticeDTO;
import project.MilkyWay.noticeMain.NoticeDetail.DTO.NoticeDetailDTO;
import project.MilkyWay.noticeMain.NoticeDetail.Entity.NoticeDetailEntity;
import project.MilkyWay.noticeMain.Notice.Entity.NoticeEntity;
import project.MilkyWay.ComonType.Expection.DeleteFailedException;
import project.MilkyWay.ComonType.Expection.FindFailedException;
import project.MilkyWay.ComonType.Expection.InsertFailedException;
import project.MilkyWay.ComonType.Expection.UpdateFailedException;
import project.MilkyWay.noticeMain.NoticeDetail.Service.NoticeDetailService;
import project.MilkyWay.noticeMain.Notice.Service.NoticeService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notice")
@Tag(name = "전체 Notice 정보를 제공하는 Controller")
public class NoticeController //Notice, Noticedetaill 동시 동작
{
    @Autowired
    NoticeService noticeService;

    @Autowired
    NoticeDetailService noticeDetailService;

    private final ResponseDTO<Object> responseDTO = new ResponseDTO<>();


    @Operation(
            summary =  "Create a new NoticeEntity and NoticeDetail",
            description = "This API creates a new NoticeEntity and NoticeDetail and returns NoticeDTO and NoticeDetailDTO  as response",
            responses = {
                    @ApiResponse(
                            responseCode = "201",
                            description = "Notice and NoticeDetail created successfully",
                            content = @Content(
                                    mediaType = "application/json",
                                    schema = @Schema(oneOf = {NoticeDTO.class, NoticeDetailDTO.class})
                            )
                    ),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@RequestBody NoticeJsonDTO noticeJsonDTO)
    {
        try
        {
            NoticeEntity noticeEntity = ConvertToNotice(noticeJsonDTO.getNoticeDTO());
            NoticeEntity notice1 = noticeService.InsertNotice(noticeEntity);
            if(notice1 != null)
            {
                int i = 0;
                List<NoticeDetailEntity> noticeDetailEntities = new ArrayList<>();
                while (i < noticeJsonDTO.getNoticeDetailDTO().size() )
                {
                    NoticeDetailEntity noticeDetailEntity = ConvertToNoticeDetail(noticeJsonDTO.getNoticeDetailDTO().get(i));
                    NoticeDetailEntity noticeDetailEntity1 = noticeDetailService.InsertNoticeDetallMapper(noticeDetailEntity);
                    if(noticeDetailEntity1 != null)
                    {
                        noticeDetailEntities.add(noticeDetailEntity1);
                    }
                    else
                    {
                        noticeService.DeleteByNoticeId(notice1.getNoticeId());
                        throw new InsertFailedException("데이터 저장에 실패했습니다.");
                    }
                    i++;
                }
                List<Object> list = new ArrayList<>();
                list.add(notice1);
                list.add(noticeDetailEntities);
                return ResponseEntity.ok().body(responseDTO.Response("success","후기 데이터 등록에 성공했습니다.", list));

            }
            else
            {
                throw new InsertFailedException("데이터 저장에 실패했습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error","후기 등록에 실패했습니다."));
        }
    }

    private NoticeDetailEntity ConvertToNoticeDetail(NoticeDetailDTO noticeDetailDTO)
    {
        return NoticeDetailEntity.builder()
                .NoticeId(noticeDetailDTO.getNoticeId())
                .NoticeDetailId(noticeDetailDTO.getNoticeDetailId())
                .direction(noticeDetailDTO.getDirection())
                .beforeURL(noticeDetailDTO.getBeforeURL())
                .afterURL(noticeDetailDTO.getAfterURL())
                .comment(noticeDetailDTO.getNoticeId())
                .build();
    }

    private NoticeEntity ConvertToNotice(NoticeDTO noticeDTO)
    {
        return NoticeEntity.builder()
                .NoticeId(noticeDTO.getNoticeId())
                .type(noticeDTO.getType())
                .greeting(noticeDTO.getNoticeId())
                .build();
    }

    @PutMapping("/Update")
    public ResponseEntity<?> Update(@RequestBody NoticeJsonDTO noticeJsonDTO)
    {
        try
        {
            NoticeEntity oldnotice = noticeService.findNoticeId(noticeJsonDTO.getNoticeDTO().getNoticeId());
            NoticeEntity notice1 = noticeService.UpdateNotice(noticeJsonDTO.getNoticeDTO().getNoticeId(), ConvertToNotice(noticeJsonDTO.getNoticeDTO()));
            if(notice1 != null)
            {
                int i = 0;
                List<NoticeDetailEntity> noticeDetailEntities = new ArrayList<>();
                while (i < noticeJsonDTO.getNoticeDetailDTO().size())
                {
                    NoticeDetailEntity noticeDetailEntity1 = noticeDetailService.UpdateNoticeDetailMapper(noticeJsonDTO.getNoticeDetailDTO().get(i).getNoticeDetailId(), ConvertToNoticeDetail(noticeJsonDTO.getNoticeDetailDTO().get(i)));
                    if(noticeDetailEntity1 != null)
                    {
                         noticeDetailEntities.add(noticeDetailEntity1);
                    }
                    else
                    {
                        noticeService.UpdateNotice(noticeJsonDTO.getNoticeDTO().getNoticeId(), oldnotice);
                        throw new InsertFailedException("데이터 저장에 실패했습니다.");
                    }
                    i++;
                }
                List<Object> list = new ArrayList<>();
                list.add(notice1);
                list.add(noticeDetailEntities);
                return ResponseEntity.ok().body(responseDTO.Response("success","후기 데이터 등록에 성공했습니다.", list));
            }
            else
            {
                throw new UpdateFailedException("후기 데이터 수정에 실패하였습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestParam String noticeId)
    {
        try
        {
            NoticeEntity noticeEntity = noticeService.findNoticeId(noticeId);
            if(noticeEntity != null)
            {
                noticeService.DeleteByNoticeId(noticeId);
                NoticeEntity noticeEntity2 = noticeService.findNoticeId(noticeId);
                if(noticeEntity2 != null)
                {
                    throw new DeleteFailedException("데이터 삭제에 실패했습니다. 다시 시도해주세요");
                }
                else
                {
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 삭제!"));
                }
            }
            else
            {
                throw new DeleteFailedException("데이터를 지우는데 실패했습니다. 다시 시도해주세요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @PostMapping("/findall")
    public ResponseEntity<?> FindALl()
    {
        try
        {
            List<Object> list = new ArrayList<>();
            List<NoticeEntity> notice = new ArrayList<>(noticeService.findAll());
            if(notice != null)
            {
                list.add(notice);//자동으로 못가져오면 추가하거나 수정 예정
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료",  list));
            }
            else
            {
                throw new FindFailedException("전체 후기 데이터를 찾아내는데 실패했습니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));

        }
    }
    @PostMapping("/find")
    public ResponseEntity<?> FindByNoticeId(@RequestParam String NoticeId)
    {
        try
        {
            List<Object> list = new ArrayList<>();
            NoticeEntity notice = noticeService.findNoticeId(NoticeId);
            if(notice != null)
            {
                list.add(notice);//자동으로 못가져오면 추가하거나 수정 예정
                List<NoticeDetailEntity> noticeEntities = new ArrayList<>(noticeDetailService.ListNoticeDetail(NoticeId));
                list.add(noticeEntities);
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 전송 완료",  list));
            }
            else
            {
                throw new FindFailedException("전체 후기 데이터를 찾아내는데 실패했습니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));

        }
    }


}
