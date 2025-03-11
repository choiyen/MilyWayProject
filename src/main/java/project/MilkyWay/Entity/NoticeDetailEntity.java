package project.MilkyWay.Entity;

import jakarta.persistence.*;
import lombok.*;
import project.MilkyWay.Enum.Cleandirection;

import java.util.List;
import java.util.UUID;


@Entity
@Table(name = "NoticeDetail")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class NoticeDetailEntity
{

    @Id
    @Column(name = "NoticeDetailId")
    @GeneratedValue(strategy = GenerationType.AUTO)  // 자동 증가 설정
    private UUID NoticeDetailId; // 1씩 증가하는 auto inclement로 작성
    @Column(name = "NoticeId")
    private String NoticeId; // NoticeDTO와 연결하기 위한 왜래키
    @Column(name = "direction")
    private Cleandirection direction; // 방 위치 중에 어디? - 기실, 방, 화장실, 베란다

    @Column(name = "beforeURL")
    private List<String> beforeURL; // 청소 전 사진
    @Column(name = "afterURL")
    private List<String> afterURL; // 청소 후 사진
    @Column(name = "comment")
    private String comment; // 해당 구역을 청소하고 느낀점 기록


    @PrePersist
    public void prePersist() {
        if (NoticeDetailId == null) {
            NoticeDetailId = UUID.randomUUID();  // UUID 값이 null이면 자동으로 생성
        }
    }
}



/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */