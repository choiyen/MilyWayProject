package project.MilkyWay.Controller;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.*;
import project.MilkyWay.Entity.NoticeDetailEntity;
import project.MilkyWay.Entity.NoticeEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Service.NoticeDetailService;
import project.MilkyWay.Service.NoticeService;

import java.util.ArrayList;
import java.util.List;
import java.util.zip.DataFormatException;

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
    public ResponseEntity<?> Insert(@RequestBody NoticeEntity notice, @RequestBody NoticeDetailEntity noticeDetailEntity)
    {
        try
        {
            NoticeEntity notice1 = noticeService.InsertNotice(notice);
            if(notice1 != null)
            {
                NoticeDetailEntity noticeDetailEntity1 = noticeDetailService.InsertNoticeDetallMapper(noticeDetailEntity);
                if(noticeDetailEntity1 != null)
                {
                    List<Object> list = new ArrayList<>();
                    list.add(notice1);
                    list.add(noticeDetailEntity1);
                    return ResponseEntity.ok().body(responseDTO.Response("success","후기 데이터 등록에 성공했습니다.", list));
                }
                else
                {
                   noticeService.DeleteByNoticeId(notice1.getNoticeId());
                   throw new InsertFailedException("데이터 저장에 실패했습니다.");
                }
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
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@RequestBody NoticeEntity notice, @RequestBody NoticeDetailEntity noticeDetailEntity)
    {
        try
        {
            NoticeEntity oldnotice = noticeService.findNoticeId(notice.getNoticeId());
            NoticeEntity notice1 = noticeService.UpdateNotice(notice.getNoticeId(), notice);
            if(notice1 != null)
            {
                NoticeDetailEntity noticeDetailEntity1 = noticeDetailService.UpdateNoticeDetailMapper(noticeDetailEntity.getNoticeDetailId(), noticeDetailEntity);
                if(noticeDetailEntity1 != null)
                {
                    List<Object> list = new ArrayList<>();
                    list.add(notice1);
                    list.add(noticeDetailEntity1);
                    return ResponseEntity.ok().body(responseDTO.Response("success","후기 데이터 등록에 성공했습니다.", list));
                }
                else
                {
                    noticeService.UpdateNotice(notice.getNoticeId(), oldnotice);
                    throw new InsertFailedException("데이터 저장에 실패했습니다.");
                }
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



}
