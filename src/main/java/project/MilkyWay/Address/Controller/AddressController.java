package project.MilkyWay.Address.Controller;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.Address.DTO.AddressDTO;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.Address.Entity.AddressEntity;
import project.MilkyWay.ComonType.Expection.FindFailedException;
import project.MilkyWay.Address.Service.AddressService;
import project.MilkyWay.ComonType.Expection.SessionNotFoundExpection;
import project.MilkyWay.ComonType.Expection.UpdateFailedException;
import project.MilkyWay.ComonType.LoginSuccess;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Tag(name = "주소 관련 정보를 제공하는  Controller")
@RestController
@RequestMapping("/address")
public class AddressController
{
    @Autowired
    AddressService addressService;

    ResponseDTO<AddressDTO> responseDTO = new ResponseDTO<>();

    LoginSuccess loginSuccess = new LoginSuccess();


    @Operation(
            summary = "Create a new Address",
            description = "This API creates a new Address and returns AddressDTO as response, but only if the user is an administrator.",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Address created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(HttpServletRequest request, @Valid @RequestBody AddressDTO addressDTO)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
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
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 주소 정보를 추가할 수 없습니다.");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }

    @Operation(
            summary = "Change an Address by AddressId",
            description = "This API changes an Address and returns AddressDTO as response, but only if the user is an administrator.",
            responses = {
                    @
                    ApiResponse(responseCode = "201", description = "Address Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid Change data")
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> Update(HttpServletRequest request, @Valid @RequestBody AddressDTO addressDTO)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
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
                    throw new UpdateFailedException("청소 예약 정보 등록 과정에서 오류 발생!! 관리자에게 문의하세요");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인X, 다시 로그인을 시도하여 주세요");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));

        }
    }

    @Operation(
            summary = "Delete an Address by AddressId , but only if the user is an administrator.",
            description = "This API deletes an Address by the provided AddressId and returns a ResponseEntity with a success or failure message.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Address deleted successfully"),
                    @ApiResponse(responseCode = "404", description = "Address not found")
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(HttpServletRequest request, @RequestParam String AddressId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                boolean bool = addressService.Delete(AddressId);
                if(bool)
                {
                    return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 삭제 성공"));
                }
                else
                {
                    throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 필요!! 권한이 없어서 데이터 삭제 불가");
            }
        } 
        catch (Exception e) 
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns a list of AddressDTO objects , but only if the user is an administrator.",
            description = "This API retrieves a list of AddressDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Address List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Address List not found")
            }
    )
    @GetMapping
    public ResponseEntity<?> FindAll(HttpServletRequest request)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                List<AddressEntity> addressEntityList = addressService.findALL();
                if(addressEntityList.isEmpty())
                {
                    throw new FindFailedException("데이터베이스를 조회하긴 했으나, 비어있습니다.");
                }
                else {
                    List<AddressDTO> addressDTOS = new ArrayList<>();
                    for (AddressEntity addressEntity : addressEntityList) {
                        addressDTOS.add(ConvertToDTO(addressEntity));
                    }
                    return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에 주소 데이터 조회 성공", addressDTOS));
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인X, 권한이 없어서 예약 정보 조회 불가");
            }

        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error",e.getMessage()));
        }
    }


    @Operation(
            summary = "Returns AddressDTO object for a given Address Id , but only if the user is an administrator.",
            description = "This API retrieves an Address based on the provided Address Id and returns the corresponding AddressDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Address found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Address not found")
            }
    )
    @PostMapping("/Find")
    public ResponseEntity<?> FindById(HttpServletRequest request, @RequestParam String AddressId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                AddressEntity addressEntity = addressService.findByAddressId(AddressId);
                if(addressEntity != null)
                {
                    AddressDTO addressDTO = ConvertToDTO(addressEntity);
                    return ResponseEntity.ok().body(responseDTO.Response("success", "데이터 조회 성공", Collections.singletonList(addressDTO)));
                }
                else
                {
                    throw new RuntimeException("예기치 못한 오류로 런타임 오류 발생!!");
                }
            }
            else
            {
                throw new SessionNotFoundExpection("관리자 로그인 X, 예약정보 조회 불가");
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
                .addressId(addressEntity1.getAddressId())
                .address(addressEntity1.getAddress())
                .customer(addressEntity1.getCustomer())
                .phoneNumber(addressEntity1.getPhoneNumber())
                .submissionDate(addressEntity1.getSubmissionDate())
                .build();
    }

    private AddressEntity ConvertToEntity(@Valid AddressDTO addressDTO)
    {
        return AddressEntity.builder()
                .addressId(addressDTO.getAddressId())
                .address(addressDTO.getAddress())
                .customer(addressDTO.getCustomer())
                .phoneNumber(addressDTO.getPhoneNumber())
                .submissionDate(addressDTO.getSubmissionDate())
                .build();
    }

}
//- 현재 날짜보다 고객의 의뢰 날짜가 뒷날일 떄 데이터를 파기하는 함수 필요
//고객 관리를 위한 목적의 DTO