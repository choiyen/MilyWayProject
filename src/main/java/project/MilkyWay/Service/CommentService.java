package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Repository.CommentRepository;

@Service
public class CommentService
{
    @Autowired
    CommentRepository commentRepository;



}
