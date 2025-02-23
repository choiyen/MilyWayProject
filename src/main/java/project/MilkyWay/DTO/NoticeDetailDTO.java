package project.MilkyWay.DTO;

import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
public class NoticeDetailDTO
{
    String NoticeDetailId; // 1씩 증가하는 auto inclement로 작성
    String NoticeId; // NoticeDTO와 연결하기 위한 왜래키
    String direction; // 방 위치 중에 어디? - 기실, 방, 화장실, 베란다
    List<String> beforeURL; // 청소 전 사진
    List<String> afterURL; // 청소 후 사진
    String comment; // 해당 구역을 청소하고 느낀점 기록
}

/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */