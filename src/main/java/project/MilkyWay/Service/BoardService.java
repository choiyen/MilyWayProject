package project.MilkyWay.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.BoardEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Repository.BoardRepository;

@Service
public class BoardService
{
    @Autowired
    BoardRepository boardRepository;


    public BoardEntity Insert(BoardEntity boardEntity)
    {
        BoardEntity BoardEntity1 = boardRepository.save(boardEntity);
        if(BoardEntity1 != null)
        {
            return BoardEntity1;
        }
        else
        {
            throw new InsertFailedException("날짜 가능 문의 등록이 실패하였습니다.");
        }
    }
    public BoardEntity Update(BoardEntity boardEntity)
    {
        BoardEntity BeforeBoardEntity = boardRepository.findByBoardId(boardEntity.getBoardId());
        if(BeforeBoardEntity != null)
        {
            BoardEntity AfterBoardEntity = ConvertToEntity(BeforeBoardEntity, boardEntity);
            BoardEntity boardEntity1 = boardRepository.save(AfterBoardEntity);
            return boardEntity1;
        }
        else
        {
            throw new FindFailedException("해당 코드를 가진 질문 게시판을 찾을 수 없습니다.");
        }

    }
    public boolean Delete(String EncodingBoardId)
    {
        boolean bool = boardRepository.existsByBoardId(EncodingBoardId);
        if (bool)
        {
            boardRepository.deleteByBoardId(EncodingBoardId);
            boolean bool2 = boardRepository.existsByBoardId(EncodingBoardId);
            if(bool2)
            {
                throw new DeleteFailedException("게시판 삭제를 시도했는데, 삭제가 되지 않고 남아있어요");
            }
            else
            {
                return bool;
            }
        }
        else
        {
            throw new FindFailedException("해당 코드로 삭제할 수 있는 게시판이 존재하지 않아요");
        }
    }
    public BoardEntity Find(String EncodingBoardId)
    {
        BoardEntity boardEntity = boardRepository.findByBoardId(EncodingBoardId);
        if(boardEntity != null)
        {
            return  boardEntity;
        }
        else
        {
            throw new FindFailedException("게시판 데이터를 찾을 수 없었어요.");
        }
    }
    private BoardEntity ConvertToEntity(BoardEntity beforeBoardEntity, BoardEntity boardEntity)
    {
        return BoardEntity.builder()
                .boardId(beforeBoardEntity.getBoardId())
                .title(boardEntity.getTitle())
                .content(boardEntity.getContent())
                .build();
    }
}
