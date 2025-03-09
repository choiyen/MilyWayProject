package project.MilkyWay.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.DTO.UserDTO;
import project.MilkyWay.Entity.UserEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Service.UserService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
//import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/user")
public class UserController //관리자 아이디를 관리하는 DTO
{
    private  ResponseDTO responseDTO = new ResponseDTO<>();

    @Autowired
    UserService userService;

//    @Autowired
//    private PasswordEncoder passwordEncoder;

    //Spring Security 적용이 안되어 있는 상태라 평문으로 확인
    @PostMapping("/Insert")
    public ResponseEntity<?> UserInsert(@RequestBody UserDTO userDTO)
    {
        try
        {
            UserEntity userEntity = ConvertToEntity(userDTO);
            UserEntity newUserEntity = userService.createUser(userEntity);
            UserDTO userDTO1 = ConvertToDTO(newUserEntity);
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 권한 등록 성공", Collections.singletonList(userDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @PutMapping("/Update")
    public ResponseEntity<?> UserUpdate(@RequestBody UserDTO NewuserDTO)
    {
        try
        {
            UserEntity userEntity = ConvertToEntity(NewuserDTO);
            UserEntity userEntity2 = userService.UpdateUser(userEntity.getUserID(), userEntity);
            UserDTO userDTO1 = ConvertToDTO(userEntity2);
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 권한 수정 성공", Collections.singletonList(userDTO1)));
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @PostMapping("/Find")
    public ResponseEntity<?> Userfind(@RequestBody String email)
    {
        try
        {
            List<UserEntity> userEntity = userService.findEmail(email);
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
    }
    @DeleteMapping("/Delete")
    public ResponseEntity<?> UserDelete(@RequestBody String userId)
    {
        try
        {
            userService.DeleteUser(userId);
            UserEntity userEntity = userService.findUserId(userId);
            if(userEntity != null)
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

    private UserEntity ConvertToEntity(UserEntity userEntity1, UserDTO newuserDTO)
    {
        return UserEntity.builder()
                .userID(userEntity1.getUserID())
                .email(newuserDTO.getEmail())
                .Password(newuserDTO.getPassword())
                .build();
    }
    private UserEntity ConvertToEntity(UserDTO userDTO)
    {
        return UserEntity.builder()
                .userID(userDTO.getUserID())
                .email(userDTO.getEmail())
                .Password(userDTO.getPassword())
                .build();
    }
    private UserDTO ConvertToDTO(UserEntity userEntity)
    {
        return UserDTO.builder()
                .userID(userEntity.getUserID())
                .email(userEntity.getEmail())
                .Password(userEntity.getPassword())
                .build();
    }
}
