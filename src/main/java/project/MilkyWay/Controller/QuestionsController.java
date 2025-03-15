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
import project.MilkyWay.DTO.*;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Service.QuestionsService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("/question")
@Tag(name = "예시 질문 정보를 제공하는 Controller")
public class QuestionsController //고객 질문을 관리하기 위한 DTO
{
    @Autowired
    QuestionsService questionsService;


    ResponseDTO<QuestionsDTO> responseDTO = new ResponseDTO<>();


    @Operation(
            summary = "Create a new Questions",  // Provide a brief summary
            description = "This API creates a new Questions and returns QuestionsDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Questions created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = QuestionsDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input data"
                    )
            }
    )
    @PostMapping("/Insert")
    public  ResponseEntity<?> QuestionInsert(@RequestBody @Valid QuestionsDTO questionsDTO)
    {
        try
        {
            QuestionsEntity questionsEntity = ConVertToEntity(questionsDTO);
            QuestionsEntity questionsEntity1 = questionsService.Insertquestion(questionsEntity);
            QuestionsDTO questionsDTO1 = ConVertToDTO(questionsEntity1);
            System.out.println(questionsEntity1);
            return ResponseEntity.badRequest().body(responseDTO.Response("success", "질문 등록에 성공하였습니다." , Collections.singletonList(questionsDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }


    @Operation(
            summary =  "Change a QuestionsDTO by QuestionsId",  // Provide a brief summary
            description = "This API Change a Questions and returns QuestionsDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Questions Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = InquireDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> QuestionUpdate(@RequestBody @Valid QuestionsDTO newquestionsDTO)
    {
        try
        {
                System.out.println(newquestionsDTO);
                QuestionsEntity questionsEntity = ConVertToEntity(newquestionsDTO);
                QuestionsEntity questionsEntity1 = questionsService.updatequestion(questionsEntity.getId(), questionsEntity);
                if(questionsEntity1 != null)
                {
                    QuestionsDTO questionsDTO1 = ConVertToDTO(questionsEntity1);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "질문 데이터 업데이트에 성공하였습니다.", Collections.singletonList(questionsDTO1)));
                }
                else
                {
                    throw new UpdateFailedException();
                }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage() ));
        }

    }

    @Operation(
            summary = "Delete an Comment by QuestionId",  // Provide a brief summary
            description = "This API deletes an Question by the provided QuestionId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Question deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Question not found"
                    )
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> QuestionDelete(@RequestParam Long QuestionId)
    {
        try
        {
            boolean bool = questionsService.DeleteByQuestionId(QuestionId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "질문 데이터 삭제에 성공하였습니다."));
            }
            else
            {
                throw new DeleteFailedException("삭제할 데이터가 존재하지 않습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));

        }
    }


    @Operation(
            summary = "Returns QuestionDTO object for a given Question Id",
            description = "This API retrieves an Question based on the provided Question Id and returns the corresponding QuestionDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Question found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = QuestionsDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Question not found")
            }
    )
    @PostMapping("/Find")
    public ResponseEntity<?> QuestionFind(@RequestParam Long QuestionId)
    {
        try
        {
            QuestionsEntity questionsEntity = questionsService.SelectQuestion(QuestionId);
            if(questionsEntity != null)
            {
                QuestionsDTO questionsDTO = ConVertToDTO(questionsEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success", "질문 데이터 찾기에 성공하였습니다.", Collections.singletonList(questionsDTO)));
            }
            else
            {
                throw new FindFailedException("질문데이터 찾기 도중 알 수 없는 오류가 발생했습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage() ));
        }
    }

    @Operation(
            summary = "Returns a list of QuestionsDTO objects",
            description = "This API retrieves a list of QuestionsDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Questions List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = QuestionsDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Questions List not found")
            }
    )
    @PostMapping("/FindALL")
    public ResponseEntity<?> QuestionFindAll()
    {
        try
        {
            List<QuestionsEntity> questionsEntities = questionsService.findAll();
            List<QuestionsDTO> questionsDTOS = new ArrayList<>();
            for(QuestionsEntity questionsEntity : questionsEntities)
            {
                questionsDTOS.add(ConVertToDTO(questionsEntity));
            }
            if(questionsDTOS.isEmpty())
            {
                throw new FindFailedException("질문 조회를 시도했으나, 데이터가 비어있습니다.");
            }
            else
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","질문 데이터 조회에 성공했습니다.",questionsDTOS));
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage() ));
        }
    }
    private QuestionsEntity ConVertToEntity(QuestionsDTO questionsDTO)
    {
        return QuestionsEntity.builder()
                .id(questionsDTO.getId())
                .exceptionQA(questionsDTO.getExceptionQA())
                .expectedComment(questionsDTO.getExpectedComment())
                .build();
    }
    private QuestionsDTO ConVertToDTO(QuestionsEntity questionsEntity)
    {
        return QuestionsDTO.builder()
                .id(questionsEntity.getId())
                .exceptionQA(questionsEntity.getExceptionQA())
                .expectedComment(questionsEntity.getExpectedComment())
                .build();
    }
}
