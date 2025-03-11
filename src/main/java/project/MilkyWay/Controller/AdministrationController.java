package project.MilkyWay.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Service.AdministrationService;

@RestController
@RequestMapping("/time")
public class AdministrationController
{
    @Autowired
    AdministrationService administrationService;

    ResponseDTO responseDTO = new ResponseDTO<>();

}
