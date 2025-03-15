package project.MilkyWay.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.*;
import project.MilkyWay.Entity.UserEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Service.UserService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
//import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/user")
@Tag(name = "유저 정보를 제공하는 Controller")
public class UserController //관리자 아이디를 관리하는 DTO
{ //1차 Test 완료 - 보안 설정 후 재테스트
    private final ResponseDTO<UserDTO> responseDTO = new ResponseDTO<>();

    @Autowired
    UserService userService;
    

    //Spring Security 적용이 안되어 있는 상태라 평문으로 확인
    @Operation(
            summary = "Create a new User",  // Provide a brief summary
            description = "This API creates a new User and returns User as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "User created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid input data"
                    )
            }
    )
    @PostMapping("/Insert")
    public ResponseEntity<?> UserInsert(@RequestBody @Valid UserDTO userDTO)
    {
        try
        {
            UserEntity userEntity = ConvertToEntity(userDTO);
            UserEntity newUserEntity = userService.createUser(userEntity);
            UserDTO userDTO1 = ConvertToDTO(newUserEntity);
            System.out.println(userDTO1);
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 권한 등록 성공", Collections.singletonList(userDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    } //1차 Test 완료, Spring Security 설정 후 재 Test 예정



    @Operation(
            summary =  "Change a UserDTO by ReservationId",  // Provide a brief summary
            description = "This API Change a User and returns UserDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "User Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
    @PutMapping("/Update")
    public ResponseEntity<?> UserUpdate(@RequestBody @Valid UserDTO NewuserDTO)
    {
        try
        {
            UserEntity userEntity = ConvertToEntity(NewuserDTO);
            UserEntity userEntity2 = userService.UpdateUser(userEntity.getUserId(), userEntity);
            UserDTO userDTO1 = ConvertToDTO(userEntity2);
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 권한 수정 성공", Collections.singletonList(userDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }//1차 Test 완료, Spring Security 설정 후 재 Test 예정


    @Operation(
            summary = "Delete an user by userId",  // Provide a brief summary
            description = "This API deletes an user by the provided userId and returns a ResponseEntity with a success or failure message.",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "user deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description ="user not found"
                    )
            }
    )
    @DeleteMapping("/Delete")
    public ResponseEntity<?> UserDelete(@RequestParam String userId)
    {
        try
        {
            boolean bool = userService.DeleteUser(userId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 정보 삭제 성공"));

            }
            else
            {
                throw new DeleteFailedException();
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));

        }
    }


    @Operation(
            summary = "Returns UserDTO object for a given email",
            description = "This API retrieves an User based on the provided email and returns the corresponding UserDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))),
                    @ApiResponse(responseCode = "404", description = "User not found")
            }
    )
    @PostMapping("/Find")
    public ResponseEntity<?> Userfind(@RequestParam String email)
    {
        try
        {
            List<UserEntity> userEntity = userService.findEmail(email);
            System.out.println(userEntity);
            List<UserDTO> userDTOS = new ArrayList<>();
            for(UserEntity user : userEntity)
            {
                userDTOS.add(ConvertToDTO(user));
            }
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 정보 찾기 성공", userDTOS));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    } //데이터 CRUD 정상 동작 확인
    
    private UserEntity ConvertToEntity(UserDTO userDTO)
    {
        System.out.println(userDTO.getPassword());
        return UserEntity.builder()
                .userId(userDTO.getUserId())
                .email(userDTO.getEmail())
                .password(userDTO.getPassword())
                .build();
    }
    private UserDTO ConvertToDTO(UserEntity userEntity)
    {
        return UserDTO.builder()
                .userId(userEntity.getUserId())
                .email(userEntity.getEmail())
                .password(userEntity.getPassword())
                .build();
    }
}
