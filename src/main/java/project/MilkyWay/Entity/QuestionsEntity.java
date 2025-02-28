package project.MilkyWay.Entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "Question")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class QuestionsEntity
{
    @Id
    @Column(name = "questionId")
    private String questionId; // Q&A 질문을 등록하기 위한 것
    @Column(name = "Question", nullable = false)
    private String ExpectionQnA; // 예상했던 Q&A 질문
    @Column(name = "Comment", nullable = false)
    private String ExpectedComment; // 예상질문에 대한 해답
}
