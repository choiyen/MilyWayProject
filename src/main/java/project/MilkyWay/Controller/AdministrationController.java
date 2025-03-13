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
import project.MilkyWay.DTO.AddressDTO;
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
@Tag(name = "일정 관련 정보를 제공하는  Controller")
public class AdministrationController
{
    @Autowired
    AdministrationService administrationService;

    ResponseDTO responseDTO = new ResponseDTO<>();


    @Operation(
            summary = "Create a new Administration",
            description = "This API creates a new Administration and returns AdministrationDTO as response",
            responses = {
                    @ApiResponse(responseCode = "201", description = "Administration created successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdministrationDTO.class))),
                    @ApiResponse(responseCode = "400", description = "Invalid input data")
            }
    )
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



    @Operation(
            summary = "Change a Administration by AdministrationId",  // Provide a brief summary
            description = "This API changes an Administration and returns AdministrationDTO as response",  // Provide detailed description
            responses = {
                    @ApiResponse(responseCode = "201", description = "Administration Changed successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdministrationDTO.class))),
                    @ApiResponse(
                            responseCode = "400",
                            description = "Invalid Change data"
                    )
            }
    )
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

    @Operation(
            summary = "Delete an administration by administrationId",  // Provide a brief summary
            description = "This API deletes an administration by the provided administrationId and returns a ResponseEntity with a success or failure message",  // Provide detailed description
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            description = "Administration deleted successfully"
                    ),
                    @ApiResponse(
                            responseCode = "404",
                            description = "Administration not found"
                    )
            }
    )
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


    @Operation(
            summary = "Returns AdministrationDTO object for a given Address Id",
            description = "This API retrieves an Administration based on the provided Administration Id and returns the corresponding AdministrationDTO object.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "Address found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AdministrationDTO.class))),
                    @ApiResponse(responseCode = "404", description = "Address not found")
            }
    )
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

    @Operation(
            summary = "Returns a list of administrationDTO objects",
            description = "This API retrieves a list of administrationDTO objects from the database.",
            responses = {
                    @ApiResponse(responseCode = "200", description = "administration List Found successfully", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressDTO.class))),
                    @ApiResponse(responseCode = "404", description = "administration List not found")
            }
    )
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
