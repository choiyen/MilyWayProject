package project.MilkyWay.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Entity.QuestionsEntity;
import project.MilkyWay.Entity.ReservationEntity;

import java.util.List;
import java.util.UUID;

@Mapper
public interface QuestionsMapper
{
    List<QuestionsEntity> findAll();
    QuestionsEntity findByQuestionId(Long questionId);
    void deleteByQuestionId(Long questionId);
    void Insert(QuestionsEntity questionsEntity);
    void Update(QuestionsEntity questionsEntity);

}
