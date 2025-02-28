package project.MilkyWay.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Entity.ReservationEntity;

import java.util.List;

@Mapper
public interface QuestionsMapper
{
    List<QuestionsEntity> findAll();
    QuestionsEntity findByQuestionId(String questionId);
    void deleteByQuestionId(String questionId);
    void Insert(QuestionsEntity questionsEntity);
    void Update(QuestionsEntity questionsEntity);

}
