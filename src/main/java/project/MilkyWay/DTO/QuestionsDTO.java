package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class QuestionsDTO //고객 질문을 관리하기 위한 DTO
{
    String questionId; // Q&A 질문을 등록하기 위한 것
    String ExpectionQnA; // 예상했던 Q&A 질문
    String ExpectedComment; // 예상질문에 대한 해답
}
