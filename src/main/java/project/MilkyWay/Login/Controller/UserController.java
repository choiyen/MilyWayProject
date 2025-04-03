package project.MilkyWay.Login.Controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.ComonType.DTO.ResponseDTO;
import project.MilkyWay.ComonType.Expection.FindFailedException;
import project.MilkyWay.ComonType.Expection.SessionNotFoundExpection;
import project.MilkyWay.ComonType.LoginSuccess;
import project.MilkyWay.Login.DTO.LoginDTO;
import project.MilkyWay.Login.DTO.UserDTO;
import project.MilkyWay.Login.Entity.UserEntity;
import project.MilkyWay.ComonType.Expection.DeleteFailedException;
import project.MilkyWay.Reservation.DTO.ReservationDTO;
import project.MilkyWay.Login.Service.UserService;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
//import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
@RequestMapping("/auth")
@Tag(name = "유저 정보를 제공하는 Controller")
public class UserController //관리자 아이디를 관리하는 DTO
{ //1차 Test 완료 - 보안 설정 후 재테스트
    private final ResponseDTO<UserDTO> responseDTO = new ResponseDTO<>();

    @Autowired
    UserService userService;

    LoginSuccess loginSuccess = new LoginSuccess();

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    @Autowired
    private HttpSession session;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
            UserEntity userEntity = ConvertToEntity(userDTO, passwordEncoder);
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
            summary = "Login a User",
            description = "This API Login a User and returns User as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "User login successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = LoginDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
    @PostMapping("/Login")
    public ResponseEntity<?> UserLogin(@RequestBody @Valid LoginDTO loginDTO) {
        try {
            // 사용자 존재 여부 확인
            UserEntity user = userService.existUser(loginDTO);

            // 비밀번호 확인 (평문 비밀번호 대신 PasswordEncoder 사용)
            if (user == null || !passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
                throw new AuthenticationException("Invalid username or password");
            }

            // 인증 토큰 생성
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginDTO.getUserId(), loginDTO.getPassword());

            // 인증 성공 후, Spring Security에서 자동으로 세션 관리
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            // 사용자 정보를 DTO로 변환하여 응답
            UserDTO user1 = ConvertToDTO(user);
            return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 로그인 성공", Collections.singletonList(user1)));

        } catch (AuthenticationException e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", "Invalid username or password"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @Operation(
            summary = "Logout a User",
            description = "This API logs out the User by invalidating the session and deleting cookies.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "User logged out successfully"),
                    @ApiResponse(responseCode = "400", description = "Error during logout")
            }
    )
    @PostMapping("/Logout")
    public ResponseEntity<?> userLogout(HttpServletRequest request) {
        try {
            // 세션 무효화
            if(loginSuccess.isSessionExist(request))
            {
                session.invalidate();
                // 쿠키 삭제 (JSESSIONID)
                Cookie cookie = new Cookie("JSESSIONID", null);
                cookie.setMaxAge(0);  // 쿠키 만료
                cookie.setPath("/");   // 전체 경로에 대해 쿠키 삭제
                response.addCookie(cookie);

                // 인증 정보 초기화
                SecurityContextHolder.clearContext();

                // 로그아웃 성공 메시지
                return ResponseEntity.ok().body("Logout successful.");
            }
            else
            {
                throw new FindFailedException("세션이 존재하지 않아, LoginOut 수행 불가");
            }


        } catch (Exception e) {
            // 로그아웃 실패 시 처리
            return ResponseEntity.badRequest().body("Logout failed: " + e.getMessage());
        }
    }



    @Operation(
            summary =  "Change a UserDTO by UserId , but only if the user is an administrator.",  // Provide a brief summary
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
    public ResponseEntity<?> UserUpdate(HttpServletRequest request, @RequestBody @Valid UserDTO NewuserDTO)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
            {
                UserEntity userEntity = ConvertToEntity(NewuserDTO, passwordEncoder);
                UserEntity userEntity2 = userService.UpdateUser(userEntity.getUserId(), userEntity);
                UserDTO userDTO1 = ConvertToDTO(userEntity2);
                return ResponseEntity.ok().body(responseDTO.Response("success", "관리자 권한 수정 성공", Collections.singletonList(userDTO1)));
            }
            else
            {
                throw new SessionNotFoundExpection("현재 로그인이 되어 있지 않아, 회원정보 수정을 할 수 없습니다.");
            }

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
    public ResponseEntity<?> UserDelete(HttpServletRequest request, @RequestParam String userId)
    {
        try
        {
            if(loginSuccess.isSessionExist(request))
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
            else
            {
               throw new SessionNotFoundExpection("세션 만료!! 현재 로그인이 되어 있지 않아 회원 탈퇴를 시도할 수 없습니다.");
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
    
    private UserEntity ConvertToEntity(UserDTO userDTO, PasswordEncoder passwordEncoder)
    {
        System.out.println(userDTO.getPassword());
        return UserEntity.builder()
                .userId(userDTO.getUserId())
                .email(userDTO.getEmail())
                .password(passwordEncoder.encode(userDTO.getPassword()))
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

