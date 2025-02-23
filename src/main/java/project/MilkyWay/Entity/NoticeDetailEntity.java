package project.MilkyWay.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.List;


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
    private String NoticeDetailId; // 1씩 증가하는 auto inclement로 작성
    @Column(name = "NoticeId")
    private String NoticeId; // NoticeDTO와 연결하기 위한 왜래키
    @Column(name = "direction")
    private String direction; // 방 위치 중에 어디? - 기실, 방, 화장실, 베란다

    @Column(name = "beforeURL")
    private List<String> beforeURL; // 청소 전 사진
    @Column(name = "afterURL")
    private List<String> afterURL; // 청소 후 사진
    @Column(name = "comment")
    private String comment; // 해당 구역을 청소하고 느낀점 기록
}

/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */