package project.MilkyWay.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.AddressDTO;
import project.MilkyWay.DTO.AdministrationDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.AddressEntity;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Service.AddressService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController
{
    @Autowired
    AddressService addressService;

    ResponseDTO responseDTO = new ResponseDTO<>();

    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody AddressDTO addressDTO)
    {
        try
        {
            AddressEntity addressEntity = ConvertToEntity(addressDTO);
            AddressEntity addressEntity1 = addressService.insert(addressEntity);
            if(addressEntity1 != null)
            {
                AddressDTO addressDTO1 = ConvertToDTO(addressEntity1);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 추가", Collections.singletonList(addressDTO1)));
            }
            else
            {
                throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody AddressDTO addressDTO)
    {
        try
        {
            AddressEntity addressEntity = ConvertToEntity(addressDTO);
            AddressEntity addressEntity1 = addressService.update(addressEntity);
            if(addressEntity1 != null)
            {
                AddressDTO addressDTO1 = ConvertToDTO(addressEntity1);
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 수정", Collections.singletonList(addressDTO1)));
            }
            else
            {
                throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));

        }
    }

    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String AddrssId)
    {
        try
        {
            boolean bool = addressService.Delete(AddrssId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 삭제 성공"));
            }
            else
            {
                throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
            }
        } 
        catch (Exception e) 
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> FindAll()
    {
        try
        {
           List<AddressEntity> addressEntityList = addressService.findALL();
            if(addressEntityList.isEmpty())
            {
                throw new FindFailedException("데이터베이스를 조회하긴 했으나, 비어있습니다.");
            }
            else if(addressEntityList != null)
            {
                List<AddressDTO> addressDTOS = new ArrayList<>();
                for(int i = 0; i < addressEntityList.size(); i++)
                {
                    addressDTOS.add(ConvertToDTO(addressEntityList.get(i)));
                }
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 조회 성공", addressDTOS));
            }
            else
            {
                throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @PostMapping("/Find")
    public ResponseEntity<?> FindById(@RequestBody String AddrssId)
    {
        try
        {
            AddressEntity addressEntity = addressService.findByAddressId(AddrssId);
            if(addressEntity != null)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 조회 성공", Collections.singletonList(addressEntity)));
            }
            else
            {
                throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    private AddressDTO ConvertToDTO(AddressEntity addressEntity1)
    {
        return AddressDTO.builder()
                .AddressId(addressEntity1.getAddressId())
                .Address(addressEntity1.getAddress())
                .customer(addressEntity1.getCustomer())
                .phoneNumber(addressEntity1.getPhoneNumber())
                .SubmissionDate(addressEntity1.getSubmissionDate())
                .build();
    }

    private AddressEntity ConvertToEntity(@Valid AddressDTO addressDTO)
    {
        return AddressEntity.builder()
                .addressId(addressDTO.getAddressId())
                .Address(addressDTO.getAddress())
                .customer(addressDTO.getCustomer())
                .phoneNumber(addressDTO.getPhoneNumber())
                .SubmissionDate(addressDTO.getSubmissionDate())
                .build();
    }

}
//- 현재 날짜보다 고객의 의뢰 날짜가 뒷날일 떄 데이터를 파기하는 함수 필요
//고객 관리를 위한 목적의 DTO