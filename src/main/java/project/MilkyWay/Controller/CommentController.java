package project.MilkyWay.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.CommentDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.CommentEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Service.BoardService;
import project.MilkyWay.Service.CommentService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.zip.DataFormatException;

@RestController
@RequestMapping("/comment")
public class CommentController
{
    @Autowired
    CommentService commentService;

    @Autowired
    BoardService boardService;

    ResponseDTO responseDTO = new ResponseDTO<>();


    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody CommentDTO commentDTO)
    {
        try
        {
            Boolean bool = boardService.Bool(commentDTO.getBoardId());
            if(bool)
            {
                CommentEntity commentEntity = ConvertToCommentEntity(commentDTO);
                CommentEntity comment = commentService.Insert(commentEntity);
                if(comment != null)
                {
                    CommentDTO commentDTO1 = ConvertToCommentDTO(comment);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "게시판에 댓글 등록 완료!", Collections.singletonList(commentDTO1)));
                }
                else
                {
                    throw new FindFailedException("게시판에 데이터 등록 완료");
                }
            }
            else
            {
                throw new FindFailedException("코멘트 정보와 매칭되는 게시판을 찾을 수 없습니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody CommentDTO commentDTO)
    {
        try
        {
            CommentEntity commentEntity = ConvertToCommentEntity(commentDTO);
            CommentEntity comment = commentService.Update(commentDTO.getComment(), commentEntity);
            if(comment != null)
            {
                CommentDTO commentDTO1 = ConvertToCommentDTO(comment);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 변경 완료!", Collections.singletonList(commentDTO1)));
            }
            else
            {
                throw new UpdateFailedException("알 수 없는 오류로 업데이트에 실패했습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @PostMapping("/Find")
    public ResponseEntity<?> FindByComentId(@RequestBody String CommentId)
    {
        try
        {
            CommentEntity commentEntity = commentService.FindByCommentId(CommentId);
            if(commentEntity != null)
            {
                CommentDTO commentDTO = ConvertToCommentDTO(commentEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 찾기에 성공하였습니다.", Collections.singletonList(commentDTO)));
            }
            else
            {
                throw new UpdateFailedException("알 수 없는 오류로 데이터 찾기에 실패했습니다.");

            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @PostMapping("/Select")
    public ResponseEntity<?> SelectByBoardId(@RequestBody String BoardId)
    {
        try
        {
            List<CommentEntity> commentEntities = commentService.FindByBoardId(BoardId);
            List<CommentDTO> commentDTOS = new ArrayList<>();
            for(CommentEntity comment : commentEntities)
            {
                commentDTOS.add(ConvertToCommentDTO(comment));
            }
            if(commentDTOS.isEmpty())
            {
                throw new FindFailedException("데이터가 비어있습니다. 다시 시도해주세요");
            }
            else if(commentDTOS != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터베이스에 데이터가 등록되어 있습니다.", commentDTOS));
            }
            else
            {
                throw new RuntimeException("알 수 없는 오류가 발생했습니다. 다시 시도해주세요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String CommentId)
    {
        try 
        {
            boolean bool = commentService.Delete(CommentId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 삭제!"));
            }
            else
            {
                throw new DeleteFailedException("데이터 삭제 실패ㅠㅠㅠ");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    private CommentDTO ConvertToCommentDTO(CommentEntity comment)
    {
        return CommentDTO.builder()
                .type(comment.getType())
                .commentId(comment.getCommentId())
                .boardId(comment.getBoardId())
                .comment(comment.getComment())
                .build();
    }

    private CommentEntity ConvertToCommentEntity(@Valid CommentDTO commentDTO)
    {
        return CommentEntity.builder()
                .type(commentDTO.getType())
                .commentId(commentDTO.getCommentId())
                .boardId(commentDTO.getBoardId())
                .comment(commentDTO.getComment())
                .build();
    }

}
