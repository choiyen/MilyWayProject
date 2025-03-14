package project.MilkyWay.Expection;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import project.MilkyWay.DTO.ResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ResponseDTO> handleValidationException(MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();

        // Validation 오류가 발생한 필드에서 메시지를 추출
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String errorMessage = error.getDefaultMessage();
            errors.add(errorMessage);
        });
        String serror = "";
        for(String error : errors)
        {
            serror += error + " ";
        }
        // ErrorResponse 객체 생성
        ResponseDTO errorResponse = new ResponseDTO<>().Response("error", serror);

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
//에러코드를 프론트로 반환할 때, 어노테이션으로 지정해놓은 에러 매세지를 프론트로 전송시키는 코드
