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
import project.MilkyWay.DTO.BoardDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.BoardEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Service.BoardService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/board")
@Tag(name = "게시판 관련 정보를 제공하는  Controller")
public class BoardController
{
    @Autowired
    BoardService boardService;

    ResponseDTO responseDTO = new ResponseDTO<>();


    @Operation(
            summary =  "Create a new Board",
            description = "This API creates a new Board and returns BoardDTO as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Board created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BoardDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody BoardDTO boardDTO)
    {
        try
        {
            BoardEntity boardEntity = ConvertToBoardEntity(boardDTO);
            BoardEntity boardEntity1 = boardService.Insert(boardEntity);
            if(boardEntity1 != null)
            {
                BoardDTO boardDTO1 = ConvertToBoardDTO(boardEntity1);
                return ResponseEntity.ok().body(responseDTO.Response("success","게시판 데이터 추가 완료", Collections.singletonList(boardDTO1)));
            }
            else
            {
                throw new InsertFailedException("데이터베이스에 데이터를 저장하는데 실패했습니다. 알 수 없는 오류가 발생했어요.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }


    @Operation(
            summary = "Change a Board by BoardId",  // Provide a brief summary
            description = "This API Change a  Board and returns BoardDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Board Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BoardDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody BoardDTO boardDTO)
    {
        try
        {
            BoardEntity boardEntity = ConvertToBoardEntity(boardDTO);
            BoardEntity boardEntity2 = boardService.Update(boardEntity);
            if(boardEntity2 != null)
            {
                BoardDTO boardDTO1 = ConvertToBoardDTO(boardEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success","게시판 데이터 업데이트 완료", Collections.singletonList(boardDTO1)));
            }
            else
            {
                throw new InsertFailedException("데이터베이스의 데이터를 수정하는데 실패했습니다. 알 수 없는 오류가 발생했어요.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Delete an Board by BoardId",  // Provide a brief summary
            description = "This API deletes an Board by the provided BoardId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Board deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Board not found"
                    )
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String BoardId)
    {
        try
        {
            boolean bool = boardService.Delete(BoardId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터 삭제 완료! 못미더우시면 DB를 확인해봐요!"));
            }
            else
            {
               throw new DeleteFailedException("데이터 삭제에 알 수 없는 오류로 실패했어요!!"); 
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));

        }
    }


    @Operation(
            summary = "Returns a list of BoardDTO objects",
            description = "This API retrieves a list of BoardDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Board List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BoardDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Board List not found")
            }
    )
    @GetMapping
    public ResponseEntity<?> FindALl()
    {
        try
        {
            List<BoardEntity> boardEntities = boardService.FindAll();
            List<BoardDTO> boardDTOS = new ArrayList<>();
            for(BoardEntity boardEntity : boardEntities)
            {
                boardDTOS.add(ConvertToBoardDTO(boardEntity));
            }
            if(boardDTOS.isEmpty())
            {
                throw new FindFailedException("데이터베이스에서 데이터를 찾았는데 비어있어요!!");
            }
            else if(boardDTOS != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에서 데이터를 못찾겠어요. 다시 시도해주세요!!", boardDTOS));
            }
            else
            {
                throw new RuntimeException("데이터베이스 조회 도중 알 수 없는 오류가 발생했습니다. 다시 시도해주세요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Returns BoardDTO object for a given Board Id",
            description = "This API retrieves an Board based on the provided Board Id and returns the corresponding BoardDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Board found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BoardDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Board not found")
            }
    )
    @PostMapping("/Find")
    public ResponseEntity<?> FindByBoardId(@RequestBody String BoardId)
    {
        try 
        {
            BoardEntity boardEntity = boardService.FindByBoardId(BoardId);
            if(boardEntity != null)
            {
                BoardDTO boardDTO1 = ConvertToBoardDTO(boardEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success","게시판 데이터 조회완료", Collections.singletonList(boardDTO1)));

            }
            else
            {
                throw new RuntimeException("데이터를 찾는 도중에 알 수 없는 오류로 DB를 조회할 수 없습니다.");
            }
        } 
        catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    private BoardDTO ConvertToBoardDTO(BoardEntity boardEntity1)
    {
        return BoardDTO.builder()
                .boardId(boardEntity1.getBoardId())
                .content(boardEntity1.getContent())
                .title(boardEntity1.getTitle())
                .build();
    }

    private BoardEntity ConvertToBoardEntity(@Valid BoardDTO boardDTO)
    {
        return BoardEntity.builder()
                .boardId(boardDTO.getBoardId())
                .content(boardDTO.getContent())
                .title(boardDTO.getTitle())
                .build();
    }
}
