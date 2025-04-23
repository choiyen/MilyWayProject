package project.MilkyWay.Inquire.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.ComonType.Expection.*;
import project.MilkyWay.ComonType.LoginSuccess;
import project.MilkyWay.Inquire.DTO.InquireDTO;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.Inquire.Entity.InquireEntity;
import project.MilkyWay.Inquire.Service.InquireService;


import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/inqurie")
@Tag(name = "Inquire 관련 정보를 제공하는 Controller")
public class InqurieController
{
    @Autowired
    InquireService inquireService;
    
    ResponseDTO<InquireDTO> responseDTO = new ResponseDTO<>();

    LoginSuccess loginSuccess = new LoginSuccess();

    @Operation(
            summary =  "Create a new Inquire, but only if the user is an administrator.",
            description = "This API creates a new Inquire and returns InquireDTO as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Inquire created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping
    public ResponseEntity<?> Insert(HttpServletRequest request, @Valid @RequestBody InquireDTO inquireDTO)
    {
        try
        {
            InquireEntity inquireEntity1 = ConvertToEntity(inquireDTO);
            InquireEntity inquireEntity2 = inquireService.Insert(inquireEntity1);
            if (inquireEntity2 != null)
            {
                InquireDTO inquireDTO1 = ConvertToDTO(inquireEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 추가에 성공했습니다.", Collections.singletonList(inquireDTO1)));
            }
            else
            {
                throw new InsertFailedException("inquire 저장에 실패했는지, 정보를 가져올 수 없어요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }



    @Operation(
            summary = "Delete an Inquire by InquireId, but only if the user is an administrator.",  // Provide a brief summary
            description = "This API deletes an Inquire by the provided InquireId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Inqurie deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Inqurie not found"
                    )
            }
    )
    @DeleteMapping
    public ResponseEntity<?> Delete(HttpServletRequest request, @RequestParam String inqurieId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                boolean bool = inquireService.Delete(inqurieId);
                if(bool)
                {
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 삭제에 성공했습니다."));
                }
                else
                {
                    throw new DeleteFailedException("이미 삭제가 진행된 상태입니다.");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객의 문의를 수정할 수 있는 건 관리자 뿐입니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns a list of InqurieDTO objects, but only if the user is an administrator.",
            description = "This API retrieves a list of InqurieDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Inqurie List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Inqurie List not found")
            }
    )
    @PostMapping("/search")
    public ResponseEntity<?> FindALL(HttpServletRequest request)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                List<InquireEntity> inquireEntities = inquireService.findAll();
                List<InquireDTO> inquireDTOS = new ArrayList<>();
                for(InquireEntity inquireEntity : inquireEntities)
                {
                    inquireDTOS.add(ConvertToDTO(inquireEntity));
                }
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 조회에 성공했습니다.", inquireDTOS));
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객이 보내온 전체 문의는 관리자만이 확인할 수 있어요");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @Operation(
            summary = "Returns InquireDTO object for a given Inquire Id, but only if the user is an administrator.",
            description = "This API retrieves an Inquire based on the provided Inquire Id and returns the corresponding InqurieDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Inquire found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Inquire not found")
            }
    )
    @GetMapping("/search")
    public ResponseEntity<?> FindById(HttpServletRequest request, @RequestParam String InquireId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                InquireEntity inquireEntity = inquireService.FindByInquireId(InquireId);
                if(inquireEntity != null)
                {
                    InquireDTO inquireDTO = ConvertToDTO(inquireEntity);
                    return ResponseEntity.ok().body(responseDTO.Response("success","데이터 전공 완료!", Collections.singletonList(inquireDTO)));
                }
                else
                {
                    throw new FindFailedException();
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 고객의 문의 정보 확인은 관리자만 가능해요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    private InquireEntity ConvertToEntity(InquireDTO inquireDTO)
    {
        return InquireEntity.builder()
                .inquireId(inquireDTO.getInquireId())
                .address(inquireDTO.getAddress())
                .phoneNumber(inquireDTO.getPhoneNumber())
                .inquire(inquireDTO.getInquire())
                .build();
    }
    private InquireDTO ConvertToDTO(InquireEntity inquireEntity)
    {
        return InquireDTO.builder()
                .inquireId(inquireEntity.getInquireId())
                .address(inquireEntity.getAddress())
                .phoneNumber(inquireEntity.getPhoneNumber())
                .inquire(inquireEntity.getInquire())
                .build();
    }


}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO