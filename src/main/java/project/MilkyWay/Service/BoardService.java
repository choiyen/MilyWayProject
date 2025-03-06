package project.MilkyWay.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Repository.BoardRepository;

@Service
public class BoardService
{
    @Autowired
    BoardRepository boardRepository;
}
