package project.MilkyWay.Controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import project.MilkyWay.DTO.AdministrationDTO;
import project.MilkyWay.DTO.ResponseDTO;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Entity.BoardEntity;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Service.AdministrationService;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/time")
public class AdministrationController
{
    @Autowired
    AdministrationService administrationService;

    ResponseDTO responseDTO = new ResponseDTO<>();


    @PostMapping("/Insert")
    public ResponseEntity<?> Insert(@Valid @RequestBody AdministrationDTO administrationDTO)
    {
        try
        {
            AdministrationEntity administration = ConvertToEntity(administrationDTO);
            AdministrationEntity administrationEntity = administrationService.insert(administration);
            if(administrationEntity != null)
            {
                AdministrationDTO administrationDTO1 = ConvertToDTO(administrationEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success","일정 데이터 추가에 성공하셨습니다.", Collections.singletonList(administrationDTO1)));
            }
            else
            {
                throw new InsertFailedException("데이터 베이스에 데이터를 추가하는 과정에서 예기치 못한 오류가 발생했습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @DeleteMapping("/Delete")
    public ResponseEntity<?> Delete(@RequestBody String administrationId)
    {
        try
        {
            boolean bool = administrationService.Delete(administrationId);
            if(bool)
            {
                return ResponseEntity.ok().body(responseDTO.Response("success","일정 데이터 추가에 성공하셨습니다."));
            }
            else
            {
                throw new InsertFailedException("데이터 베이스에 데이터를 삭제하는 과정에서 예기치 못한 오류가 발생했습니다.");

            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    @PutMapping("/Update")
    public ResponseEntity<?> Update(@Valid @RequestBody AdministrationDTO administrationDTO)
    {
        try
        {
            AdministrationEntity administration = ConvertToEntity(administrationDTO);
            AdministrationEntity administrationEntity = administrationService.Update(administration);
            if(administrationEntity != null)
            {
                AdministrationDTO administrationDTO1 = ConvertToDTO(administrationEntity);
                return ResponseEntity.ok().body(responseDTO.Response("success","일정 데이터 업데이트에 성공하셨습니다."));
            }
            else
            {
                throw new InsertFailedException("데이터 베이스의 데이터를 수정하는 과정에서 예기치 못한 오류가 발생했습니다.");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @PostMapping("/Find")
    public ResponseEntity<?> FindByadministration(@RequestBody String AdministrationId)
    {
        try
        {
            AdministrationEntity administration = administrationService.FindByAdministration(AdministrationId);
            if(administration != null)
            {
                AdministrationDTO administrationDTO = ConvertToDTO(administration);
                return ResponseEntity.ok().body(responseDTO.Response("success","일정 데이터 찾기 성공", Collections.singletonList(administrationDTO)));
            }
            else
            {
                throw new FindFailedException("예기치 못한 오류로 일정 데이터 찾기를 보류합니다. 에러코드를 확인해주세요");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> FindAll()
    {
        try
        {
            List<AdministrationEntity> administrationEntities = administrationService.FindAll();
            
            if(administrationEntities.isEmpty())
            {
                throw new FindFailedException("데이터를 조회하는데는 성공했으나, 데이터베이스가 비어있음");
            }
            else if(administrationEntities != null) 
            {
                List<AdministrationDTO> administrationDTOS = new ArrayList<>();
                for(int i = 0; i< administrationEntities.size(); i++)
                {
                    administrationDTOS.add(ConvertToDTO(administrationEntities.get(i)));
                }
                return ResponseEntity.ok().body(responseDTO.Response("success","데이터베이스에서 일정데이터 전체조회 성공",  administrationDTOS));
            }
            else
            {
                throw new FindFailedException("예기치 못한 오류 발생!! 데이터 찾기 종료");
            }
        }
        catch (Exception e)
        {
            return ResponseEntity.badRequest().body(responseDTO.Response("error", e.getMessage()));
        }
    }
    private AdministrationDTO ConvertToDTO(AdministrationEntity administrationEntity)
    {
        return AdministrationDTO.builder()
                .administrationId(administrationEntity.getAdministrationId())
                .administrationDate(administrationEntity.getAdministrationDate())
                .adminstrationType(administrationEntity.getAdminstrationType())
                .build();
    }

    private AdministrationEntity ConvertToEntity(AdministrationDTO administrationDTO)
    {
        return AdministrationEntity.builder()
                .administrationId(administrationDTO.getAdministrationId())
                .adminstrationType(administrationDTO.getAdminstrationType())
                .administrationDate(administrationDTO.getAdministrationDate())
                .build();
    }

}
