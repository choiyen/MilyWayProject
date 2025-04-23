package project.MilkyWay.noticeMain.Common.Controller;



import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.ComonType.Expection.*;
import project.MilkyWay.ComonType.LoginSuccess;
import project.MilkyWay.Inquire.DTO.InquireDTO;
import project.MilkyWay.Question.DTO.QuestionsDTO;
import project.MilkyWay.noticeMain.Common.DTO.NoticeJsonDTO;
import project.MilkyWay.noticeMain.Notice.DTO.NoticeDTO;
import project.MilkyWay.noticeMain.NoticeDetail.DTO.NoticeDetailDTO;
import project.MilkyWay.noticeMain.NoticeDetail.Entity.NoticeDetailEntity;
import project.MilkyWay.noticeMain.Notice.Entity.NoticeEntity;
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

    LoginSuccess loginSuccess = new LoginSuccess();

    //Node jS에서도 사용 가능하니까, 나중에 플젝 정리할 때 추가 체크하자.
    @Operation(
            summary =  "Create a new NoticeEntity and NoticeDetail , but only if the user is an administrator.",
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
    @PostMapping
    public ResponseEntity<?> Insert(HttpServletRequest request, @RequestBody NoticeJsonDTO noticeJsonDTO)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                NoticeEntity noticeEntity = ConvertToNotice(noticeJsonDTO.getNoticeDTO());
                NoticeEntity notice1 = noticeService.InsertNotice(noticeEntity);
                if(notice1 != null)
                {
                    System.out.println(notice1);
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
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 후기 정보 등록은 관리자 로그인이 필요합니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @Operation(
            summary =  "Change a NoticeDTO and NoticeDetailDTO List by NoticeId , but only if the user is an administrator.",  // Provide a brief summary
            description = "This API Change a NoticeDTO, NoticeDetailDTO and returns NoticeJsonDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "notice and NoticeDetail Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(oneOf = {NoticeDTO.class, NoticeDetailDTO.class} ))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping
    public ResponseEntity<?> Update(HttpServletRequest request, @RequestBody NoticeJsonDTO noticeJsonDTO)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
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
                    return ResponseEntity.ok().body(responseDTO.Response("success","후기 데이터 수정에 성공했습니다.", list));
                }
                else
                {
                    throw new UpdateFailedException("후기 데이터 수정에 실패하였습니다.");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 후기 정보의 수정은 관리자에게만 허용됩니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Delete an notice and NoticeDetail List by noticeId , but only if the user is an administrator.",  // Provide a brief summary
            description = "This API deletes an notice and NoticeDetail List by the provided noticeId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "notice and NoticeDetail deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "notice and NoticeDetail not found"
                    )
            }
    )
    @DeleteMapping
    public ResponseEntity<?> Delete(HttpServletRequest request, @RequestParam String noticeId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                List<NoticeDetailEntity> noticeDetailEntity = noticeDetailService.ListNoticeDetail(noticeId);
                if(noticeDetailEntity != null)
                {
                    for(NoticeDetailEntity noticeDetail : noticeDetailEntity)
                    {
                        noticeDetailService.DeleteToNoticeDetail(noticeDetail.getNoticeDetailId());
                    }
                    NoticeEntity noticeEntity = noticeService.findNoticeId(noticeId);
                    if(noticeEntity != null)
                    {
                        boolean bool =  noticeService.DeleteByNoticeId(noticeId);
                        if(!bool)
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
                else
                {
                    throw new FindFailedException("삭제할 세부 정보를 찾을 수 없습니다.");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 후기 정보 삭제에는 관리자 로그인이 반드시 필요합니다.");
            }


        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Returns a list of Notice objects along with their associated NoticeDetails.",
            description = "This API fetches a list of Notice and NoticeDetail objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Notice and Notice Detail List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoticeJsonDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Notice and Notice Detail List not found")
            }
    )
    @PostMapping("/search")
    public ResponseEntity<?> FindALl()
    {
        try
        {
            List<Object> list = new ArrayList<>();
            List<NoticeEntity> notice = new ArrayList<>(noticeService.findAll());
            if(notice != null)
            {
                for (int i = 0; i < notice.size(); i++) {
                    NoticeEntity notice1 = notice.get(i); // 리스트에서 해당 인덱스의 NoticeEntity를 가져옵니다.
                    notice.set(i, NoticeEntity.builder()  // 새로 만든 NoticeEntity 객체로 덮어씁니다.
                            .noticeId(notice1.getNoticeId())
                            .greeting(notice1.getGreeting())
                            .type(notice1.getType())
                            .noticeDetailEntities(noticeDetailService.ListNoticeDetail(notice1.getNoticeId()))
                            .build());
                }
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

    @Operation(
            summary = "Returns a NoticeDTO object for a given notice ID, along with its associated NoticeDetail list. ",
            description = "This API retrieves a notice based on the provided notice ID and returns the corresponding NoticeDTO along with its associated NoticeDetail list.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "NoticeDTO and NoticeDetail List found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = NoticeJsonDTO.class))),
                    @ApiResponse(responseCode = "404", description = "NoticeDTO and NoticeDetail List not found")
            }
    )
    @GetMapping("/search")
    public ResponseEntity<?> FindByNoticeId(@RequestParam String NoticeId)
    {
        try
        {
            List<Object> list = new ArrayList<>();
            NoticeEntity notice = noticeService.findNoticeId(NoticeId);
            if(notice != null)
            {
                list.add(NoticeEntity.builder()
                                .type(notice.getType())
                                .noticeId(notice.getNoticeId())
                                .greeting(notice.getGreeting())
                                .noticeDetailEntities(noticeDetailService.ListNoticeDetail(notice.getNoticeId()))
                        .build());
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

    private NoticeDetailEntity ConvertToNoticeDetail(NoticeDetailDTO noticeDetailDTO)
    {
        return NoticeDetailEntity.builder()
                .noticeId(noticeDetailDTO.getNoticeId())
                .noticeDetailId(noticeDetailDTO.getNoticeDetailId())
                .direction(noticeDetailDTO.getDirection())
                .beforeURL(noticeDetailDTO.getBeforeURL())
                .afterURL(noticeDetailDTO.getAfterURL())
                .comment(noticeDetailDTO.getComment())
                .build();
    }

    private NoticeEntity ConvertToNotice(NoticeDTO noticeDTO)
    {
        return NoticeEntity.builder()
                .noticeId(noticeDTO.getNoticeId())
                .type(noticeDTO.getType())
                .greeting(noticeDTO.getGreeting())
                .build();
    }
}
