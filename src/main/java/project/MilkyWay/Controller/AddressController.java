package project.MilkyWay.Controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
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



@Api(tags = {"주소 관련 정보를 제공하는  Controller"})
@RestController
@RequestMapping("/address")
public class AddressController
{
    @Autowired
    AddressService addressService;

    ResponseDTO responseDTO = new ResponseDTO<>();

    @ApiOperation(
            value = "Create a new Address",
            response = AddressDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API creates a new Address and returns AddressDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Address created successfully"),
            @ApiResponse(code = 400, message = "Invalid input data")
    })
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

    @ApiOperation(
            value = "Change a Address by AddressId",
            response = AddressDTO.class,  // AddressDTO를 반환 타입으로 지정
            notes = "This API Change a  Address and returns AddressDTO as response"
    )
    @ApiResponses({
            @ApiResponse(code = 201, message = "Address Changed successfully"),
            @ApiResponse(code = 400, message = "Invalid Change data")
    })
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

    @ApiOperation(
            value = "Delete an Address by AddressId",
            response = ResponseEntity.class,  // 반환 타입을 ResponseEntity로 지정
            notes = "This API deletes an Address by the provided AddressId and returns a ResponseEntity with a success or failure message."
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Address deleted successfully"),
            @ApiResponse(code = 404, message = "Address not found")
    })
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

    @ApiOperation(
            value = "Returns a list of AddressDTO objects",
            response = List.class,  // 반환 타입을 List로 지정
            notes = "This API updates an Address and returns a List of AddressDTO objects as the response."
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Address List Found successfully"),
            @ApiResponse(code = 404, message = "Address List not found")
    })
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
    @ApiOperation(
            value = "Returns AddressDTO object for a given Address Id",
            response = AddressDTO.class,  // 반환 타입을 AddressDTO로 지정
            notes = "This API updates an Address based on the provided Address Id and returns the corresponding AddressDTO object as response."
    )
    @ApiResponses({
            @ApiResponse(code = 200, message = "Address List Found successfully"),
            @ApiResponse(code = 404, message = "Address List not found")
    })
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