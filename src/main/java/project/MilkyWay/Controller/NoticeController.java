package project.MilkyWay.Controller;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.CommentDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.NoticeDetailEntity;
import project.MilkyWay.Entity.NoticeEntity;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Service.NoticeDetailService;
import project.MilkyWay.Service.NoticeService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notice")
@Api(tags = {"전체 Notice 정보를 제공하는 Controller"})
public class NoticeController //Notice, Noticedetaill 동시 동작
{
    @Autowired
    NoticeService noticeService;

    @Autowired
    NoticeDetailService noticeDetailService;

    ResponseDTO responseDTO = new ResponseDTO<>();

    @ApiOperation(
            value = "Create a new NoticeEntity and NoticeDetail",
            response = CommentDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API creates a new NoticeEntity and NoticeDetail and returns NoticeDTO and NoticeDetailDTO  as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Notice and NoticeDetail created successfully"),
            @ApiResponse(code = 400, message = "Invalid input data")
    })
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
                    return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success","후기 데이터 등록에 성공했습니다.", list));
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

}
