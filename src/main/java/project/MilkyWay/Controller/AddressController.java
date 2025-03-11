package project.MilkyWay.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Service.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController
{
    @Autowired
    AddressService addressService;


    ResponseDTO responseDTO = new ResponseDTO<>();
}
//- 현재 날짜보다 고객의 의뢰 날짜가 뒷날일 떄 데이터를 파기하는 함수 필요
//고객 관리를 위한 목적의 DTO