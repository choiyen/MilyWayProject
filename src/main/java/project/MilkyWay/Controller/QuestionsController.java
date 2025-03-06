package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.MilkyWay.DTO.QuestionsDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Service.QuestionsService;

import java.util.Collections;

@RestController
@RequestMapping("/question")
public class QuestionsController //고객 질문을 관리하기 위한 DTO
{
    @Autowired
    QuestionsService questionsService;


    ResponseDTO responseDTO = new ResponseDTO<>();

    public ResponseEntity<?> QuestionUpdate(@RequestBody QuestionsDTO newquestionsDTO)
    {
        try
        {
            QuestionsEntity oldquestionEntity = questionsService.SelectQuestion(newquestionsDTO.getQuestionId());
            if(oldquestionEntity != null)
            {
                QuestionsEntity questionsEntity = ConVertToEntity(oldquestionEntity, newquestionsDTO);
                QuestionsEntity questionsEntity1 = questionsService.updatequestion(oldquestionEntity.getQuestionId(), questionsEntity);
                QuestionsDTO questionsDTO1 = ConVertToDTO(questionsEntity1);
                return ResponseEntity.<ResponseDTO>ok().body(responseDTO.Response("success", "질문 데이터 업데이트에 성공하였습니다.", Collections.singletonList(questionsDTO1)));
            }
            else
            {
                throw new FindFailedException("현재 저장되지 않은 질문인 것 같아요.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", "질문 등록에 실패하였습니다." ));
        }

    }
    public  ResponseEntity<?> QuestionInsert(@RequestBody QuestionsDTO questionsDTO)
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
            return ResponseEntity.badRequest().body(responseDTO.Response("error", "질문 등록에 실패하였습니다." ));
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
