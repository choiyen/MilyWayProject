package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.mapper.QuestionsMapper;

import java.io.IOException;
import java.util.List;

@Service
public class QuestionsService //고객 질문을 관리하기 위한 DTO
{
    @Autowired
    QuestionsMapper questionsMapper;

    public QuestionsEntity Insertquestion(QuestionsEntity newQuestionEntity)
    {
        questionsMapper.Insert(newQuestionEntity);
        QuestionsEntity questionsEntity = questionsMapper.findByQuestionId(newQuestionEntity.getQuestionId());
        if(questionsEntity != null)
        {
            return  questionsEntity;
        }
        else
        {
            throw new RuntimeException("해당 질문 데이터를 추가할 수 없습니다.");
        }
    }
    public QuestionsEntity updatequestion(String encodingquestionId, QuestionsEntity newQuestionEntity)
    {
        QuestionsEntity questionsEntity = questionsMapper.findByQuestionId(encodingquestionId);
        if(questionsEntity != null)
        {
            QuestionsEntity changeQuestionEntity = ChangeToQuestion(questionsEntity, newQuestionEntity);
            questionsMapper.Update(changeQuestionEntity);
            QuestionsEntity ChangeDate = questionsMapper.findByQuestionId(encodingquestionId);
            if(ChangeDate.getQuestionId().equals(changeQuestionEntity.getQuestionId()) && ChangeDate.getExpectionQnA().equals(changeQuestionEntity.getExpectionQnA())&&ChangeDate.getExpectedComment().equals(changeQuestionEntity.getExpectedComment()))
            {
                return ChangeDate;
            }
            else
            {
                throw new RuntimeException("변경에 실패했는지, 변경 데이터와 요청 데이터가 달라요");
            }
        }
        else
        {
            throw new RuntimeException("해당 질문코드를 지닌 질문을 찾지 못하기에 수정할 수 없습니다");
        }

    }
    public boolean DeleteByQuestionId(String encodingQuestionId) throws IOException {
        QuestionsEntity questionsEntity = questionsMapper.findByQuestionId(encodingQuestionId);
        if(questionsEntity != null)
        {
            questionsMapper.deleteByQuestionId(encodingQuestionId);
            QuestionsEntity questionsEntity2 = questionsMapper.findByQuestionId(encodingQuestionId);
            if(questionsEntity == null)
            {
                return true;
            }
            else
            {
                throw new IOException("삭제를 시도했는데 데이터가 살아있네요ㅠㅠㅠㅠ");
            }
        }
        else
        {
            throw new RuntimeException("데이터를 지울려고 했는데, 질문 Id에 맞는 정보가 없네요");
        }
    }

    public List<QuestionsEntity> findAll()
    {
        List<QuestionsEntity> list = questionsMapper.findAll();
        if(!list.isEmpty())
        {
            return list;
        }
        else if(list.isEmpty())
        {
            throw new RuntimeException("전체 회원정보를 찾긴 찾았는데 리스트가 비어있어요.");
        }
        else
        {
            throw new RuntimeException("회원정보를 찾다가 오류가 발생했어요!! 관리자님한테 문의하세요");
        }
    }
    public QuestionsEntity SelectQuestion(String encodingquestionId)
    {
        QuestionsEntity questionsEntity = questionsMapper.findByQuestionId(encodingquestionId);
        if(questionsEntity != null)
        {
            return questionsEntity;
        }
        else
        {
            throw new RuntimeException("해당 질문코드를 지닌 데이터는 없어요.");
        }
    }

    private QuestionsEntity ChangeToQuestion(QuestionsEntity questionsEntity, QuestionsEntity newQuestionEntity)
    {
        QuestionsEntity ChangeNewQuestion = QuestionsEntity.builder()
                .questionId(questionsEntity.getQuestionId())
                .ExpectionQnA(newQuestionEntity.getQuestionId())
                .ExpectedComment(newQuestionEntity.getExpectedComment())
                .build();

        return ChangeNewQuestion;
    }


}
