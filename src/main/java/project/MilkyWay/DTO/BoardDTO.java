package project.MilkyWay.DTO;


import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BoardDTO
{
    String boardId; // 그냥 1씩 증가하는 int로 작성(데이터 수정을 위한 목적) - 게시판 질문
    String title; // 게시판 질문의 제목을 저장하는 변수
    String content; // 게시판의 내용을 저장하는 변수
}
