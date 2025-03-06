package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.CommentEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.BoardRepository;
import project.MilkyWay.Repository.CommentRepository;

import java.util.List;

@Service
public class CommentService
{
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    BoardRepository boardRepository;

    public CommentEntity Insert(CommentEntity comment)
    {
        try
        {
            boolean bool = boardRepository.existsByBoardId(comment.getBoardId());
            if(bool)
            {
                CommentEntity commentEntity = commentRepository.save(comment);
                return commentEntity;
            }
            else
            {
                throw new FindFailedException("추가하는데 필요한 질문 게시판 정보를 찾을 수 없어요.");
            }
        }
        catch (Exception e)
        {
            throw  new InsertFailedException();
        }
    }
    public CommentEntity Update(String commentId, CommentEntity comment)
    {
        try
        {
           CommentEntity commentEntity = commentRepository.findByCommentId(commentId);
           if(commentEntity != null)
           {
                CommentEntity UpdateComment = ConvertToEntity(commentEntity, comment);
                CommentEntity commentEntity1 = commentRepository.save(UpdateComment);
                return commentEntity1;
           }
           else
           {
               throw new FindFailedException("댓글 내역을 찾을 수 없습니다.");
           }
        }
        catch (Exception e)
        {
            throw new UpdateFailedException();
        }
    }
    public boolean Delete(String EnCodingCommentId)
    {
        boolean bool = commentRepository.existsByCommentId(EnCodingCommentId);
        if(bool)
        {
            commentRepository.deleteByCommentId(EnCodingCommentId);
            return  bool;
        }
        else
        {
            throw new DeleteFailedException("해당 CommentId를 가진 질문이 존재하지 않습니다.");
        }
    }
    public List<CommentEntity> Find(String EnCodingBoardId)
    {
        List<CommentEntity> commentEntities = commentRepository.findByBoardId(EnCodingBoardId);
        if(commentEntities != null)
        {
            return commentEntities;
        }
        else if(commentEntities.isEmpty())
        {
            throw new FindFailedException("데이터 조회에는 성공하였으나, 조회 결과가 없습니다.");
        }
        else
        {
            throw  new FindFailedException("알 수 없는 오류로 데이터 조회에 실패하였습니다.");
        }
    }
    private CommentEntity ConvertToEntity(CommentEntity Oldcomment, CommentEntity newcomment)
    {
        return CommentEntity.builder()
                .boardId(Oldcomment.getBoardId())
                .commentId(Oldcomment.getCommentId())
                .comment(newcomment.getComment())
                .type(Oldcomment.getType())
                .build();
    }


}
