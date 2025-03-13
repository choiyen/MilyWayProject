package project.MilkyWay.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.BoardDTO;
import project.MilkyWay.DTO.CommentDTO;
import project.MilkyWay.DTO.InquireDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.InquireEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.InqurieRepository;
import project.MilkyWay.Service.InquireService;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/inqurie")
@Tag(name = "Inquire 관련 정보를 제공하는 Controller")
public class InqurieController
{
    @Autowired
    InquireService inquireService;
    
    ResponseDTO responseDTO = new ResponseDTO<>();



    @Operation(
            summary =  "Create a new Inquire",
            description = "This API creates a new Inquire and returns InquireDTO as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Inquire created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody InquireDTO inquireDTO)
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



    @Operation(
            summary = "Change a Inquire by InquireId",  // Provide a brief summary
            description = "This API Change a Inquire and returns InquireDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Inquire Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody InquireDTO inquireDTO)
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


    @Operation(
            summary = "Delete an Inqurie by InqurieId",  // Provide a brief summary
            description = "This API deletes an Inqurie by the provided InqurieId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
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


    @Operation(
            summary = "Returns a list of InqurieDTO objects",
            description = "This API retrieves a list of InqurieDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Inqurie List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Inqurie List not found")
            }
    )
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

    @Operation(
            summary = "Returns InqurieDTO object for a given Inqurie Id",
            description = "This API retrieves an Inqurie based on the provided Inqurie Id and returns the corresponding InqurieDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Inqurie found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Inqurie not found")
            }
    )
    @PostMapping("/select")
    public ResponseEntity<?> FindById(@RequestBody String InqurieId)
    {
        try
        {
            InquireEntity inquireEntity = inquireService.FindByInquireId(InqurieId);
            if(inquireEntity != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 전공 완료!", Collections.singletonList(inquireEntity)));
            }
            else
            {
                throw new FindFailedException();
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
                .Address(inquireDTO.getAddress())
                .PhoneNumber(inquireDTO.getPhoneNumber())
                .Inquire(inquireDTO.getInquire())
                .build();
    }
    private InquireDTO ConvertToDTO(InquireEntity inquireEntity)
    {
        return InquireDTO.builder()
                .inquireId(inquireEntity.getInquireId())
                .Address(inquireEntity.getAddress())
                .PhoneNumber(inquireEntity.getPhoneNumber())
                .Inquire(inquireEntity.getInquire())
                .build();
    }


}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO