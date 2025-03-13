package project.MilkyWay.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.BoardDTO;
import project.MilkyWay.DTO.CommentDTO;
import project.MilkyWay.DTO.QuestionsDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Service.QuestionsService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.MissingResourceException;

@RestController
@RequestMapping("/question")
@Api(tags = {"예시 질문 정보를 제공하는 Controller"})
public class QuestionsController //고객 질문을 관리하기 위한 DTO
{
    @Autowired
    QuestionsService questionsService;


    ResponseDTO responseDTO = new ResponseDTO<>();

    @ApiOperation(
            value = "Create a new Questions",
            response = CommentDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API creates a new Questions and returns QuestionsDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Questions created successfully"),
            @ApiResponse(code = 400, message = "Invalid input data")
    })
    @PostMapping("/Insert")
    public  ResponseEntity<?> QuestionInsert(@Valid  @RequestBody QuestionsDTO questionsDTO)
    {
        try
        {
            QuestionsEntity questionsEntity = ConVertToEntity(questionsDTO);
            QuestionsEntity questionsEntity1 = questionsService.Insertquestion(questionsEntity);
            QuestionsDTO questionsDTO1 = ConVertToDTO(questionsEntity1);
            return ResponseEntity.badRequest().body(responseDTO.Response("success", "질문 등록에 성공하였습니다." , Collections.singletonList(questionsDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @ApiOperation(
            value = "Change a QuestionsDTO by QuestionsId",
            response = BoardDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API Change a Questions and returns QuestionsDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Questions Changed successfully"),
            @ApiResponse(code = 400, message = "Invalid Change data")
    })
    @PutMapping("/Update")
    public ResponseEntity<?> QuestionUpdate(@Valid @RequestBody QuestionsDTO newquestionsDTO)
    {
        try
        {

                QuestionsEntity questionsEntity = ConVertToEntity(newquestionsDTO);
                QuestionsEntity questionsEntity1 = questionsService.updatequestion(questionsEntity.getQuestionId(), questionsEntity);
                if(questionsEntity1 != null)
                {
                    QuestionsDTO questionsDTO1 = ConVertToDTO(questionsEntity1);
                    return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success", "질문 데이터 업데이트에 성공하였습니다.", Collections.singletonList(questionsDTO1)));
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

    @ApiOperation(
            value = "Delete an Comment by QuestionId",
            response = ResponseEntity.class,  // 반환 타입을 ResponseEntity로 지정
            notes = "This API deletes an Question by the provided QuestionId and returns a ResponseEntity with a success or failure message."
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Question deleted successfully"),
            @ApiResponse(code = 404, message = "Question not found")
    })
    @DeleteMapping("/Delete")
    public ResponseEntity<?> QuestionDelete(@RequestBody Long QuestionId)
    {
        try
        {
            boolean bool = questionsService.DeleteByQuestionId(QuestionId);
            if(bool)
            {
                return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success", "질문 데이터 삭제에 성공하였습니다."));
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
    @PostMapping("/Find")
    public ResponseEntity<?> QuestionFind(@Valid @RequestBody Long QuestionId)
    {
        try
        {
            QuestionsEntity questionsEntity = questionsService.SelectQuestion(QuestionId);
            if(questionsEntity != null)
            {
                QuestionsDTO questionsDTO = ConVertToDTO(questionsEntity);
                return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success", "질문 데이터 찾기에 성공하였습니다.", Collections.singletonList(questionsDTO)));
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
    @PostMapping("/FindAll")
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
                return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success","질문 데이터 조회에 성공했습니다.",questionsDTOS));
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
                .ExpectionQnA(questionsDTO.getExpectionQnA())
                .ExpectedComment(questionsDTO.getExpectedComment())
                .build();
    }
    private QuestionsDTO ConVertToDTO(QuestionsEntity questionsEntity)
    {
        return QuestionsDTO.builder()
                .questionId(questionsEntity.getQuestionId())
                .ExpectionQnA(questionsEntity.getExpectionQnA())
                .ExpectedComment(questionsEntity.getExpectedComment())
                .build();
    }
    private QuestionsEntity ConVertToEntity(QuestionsEntity oldquestionEntity, QuestionsDTO newquestionsDTO)
    {
        return QuestionsEntity.builder()
                .questionId(oldquestionEntity.getQuestionId())
                .ExpectionQnA(newquestionsDTO.getExpectionQnA())
                .ExpectedComment(newquestionsDTO.getExpectedComment())
                .build();
    }
}
