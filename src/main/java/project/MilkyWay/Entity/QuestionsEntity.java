package project.MilkyWay.Entity;


import jakarta.persistence.*;
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
    @GeneratedValue(strategy = GenerationType.AUTO)  // UUID는 자동 생성되지 않으므로, 이를 위한 자동 전략 사용
    private Long questionId; // Q&A 질문을 등록하기 위한 것
    @Column(name = "Question", nullable = false)
    private String ExpectionQnA; // 예상했던 Q&A 질문
    @Column(name = "Comment", nullable = false)
    private String ExpectedComment; // 예상질문에 대한 해답


}
