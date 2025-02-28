package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Repository.InqurieRepository;

import java.util.Date;

@Service
public class InqurieService
{
    @Autowired
    InqurieRepository inqurieRepository;
}
//- 상담 신청이 들어온 날짜에서 1주일이 지날 경우, 자동 페기하는 스케줄러 등록
//상담 신청을 받기 위한 DTO