package project.MilkyWay.Controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
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


@RestController
@RequestMapping("/comment")
@Tag(name = "댓글 관련 정보를 제공하는 Controller")
public class CommentController
{
    @Autowired
    CommentService commentService;

    @Autowired
    BoardService boardService;

    ResponseDTO<CommentDTO> responseDTO = new ResponseDTO<>();


    @Operation(
            summary =  "Create a new Comment",
            description = "This API creates a new Comment and returns CommentDTO as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Comment created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody CommentDTO commentDTO)
    {
        try
        {
            boolean bool = boardService.Bool(commentDTO.getBoardId());
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



    @Operation(
            summary = "Change a Comment by CommentId",  // Provide a brief summary
            description = "This API Change a Comment and returns CommentDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Comment Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody CommentDTO commentDTO)
    {
        try
        {
            CommentEntity commentEntity = ConvertToCommentEntity(commentDTO);
            CommentEntity comment = commentService.Update(commentDTO.getCommentId(), commentEntity);
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


    @Operation(
            summary = "Delete an Comment by CommentId",  // Provide a brief summary
            description = "This API deletes an Comment by the provided CommentId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Comment deleted successfully"
        ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Comment not found"
                    )
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody Long CommentId)
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

    @Operation(
            summary = "Returns CommentDTO object for a given Comment Id",
            description = "This API retrieves an Comment based on the provided Comment Id and returns the corresponding CommentDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Comment found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Comment not found")
            }
    )
    @PostMapping("/Find")
    public ResponseEntity<?> FindByCommentId(@RequestBody Long CommentId)
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

    @Operation(
            summary = "Returns Comment List for a given Board Id",
            description = "This API retrieves an Comment based on the provided Board Id and returns the corresponding CommentDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Comment found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CommentDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Comment not found")
            }
    )
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
            else {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터베이스에 데이터가 등록되어 있습니다.", commentDTOS));
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
