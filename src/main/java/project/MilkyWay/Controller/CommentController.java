package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Service.CommentService;

@RestController
@RequestMapping("/comment")
public class CommentController
{
    @Autowired
    CommentService commentService;

    ResponseDTO responseDTO = new ResponseDTO<>();
}
