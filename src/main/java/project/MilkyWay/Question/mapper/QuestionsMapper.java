package project.MilkyWay.Question.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Question.Entity.QuestionsEntity;


import java.util.List;


@Mapper
public interface QuestionsMapper
{
    List<QuestionsEntity> findAll();
    QuestionsEntity findById(Long Id);
    void deleteById(Long Id);
    void Insert(QuestionsEntity questionsEntity);
    void Update(QuestionsEntity questionsEntity);

}
