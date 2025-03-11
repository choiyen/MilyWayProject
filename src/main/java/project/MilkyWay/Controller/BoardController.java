package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Service.BoardService;

@RestController
@RequestMapping("/board")
public class BoardController
{
    @Autowired
    BoardService boardService;

    ResponseDTO responseDTO = new ResponseDTO<>();
}
