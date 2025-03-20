package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.AdministrationRepository;

import java.time.LocalDate;
import java.util.List;

@Service
public class AdministrationService
{
    @Autowired
    AdministrationRepository administrationRepository;

    public AdministrationEntity insert(AdministrationEntity administration)
    {
        AdministrationEntity administrationEntity = administrationRepository.save(administration);
        if(administrationEntity != null)
        {
            return administrationEntity;
        }
        else
        {
            throw new InsertFailedException("데이터 저장을 시도하였으나, 정상적으로 입력되지 않았습니다.");
        }
    }
    public AdministrationEntity Update(AdministrationEntity administration)
    {
        AdministrationEntity oldAdmin = administrationRepository.findByAdministrationId(administration.getAdministrationId());
        if(oldAdmin != null)
        {
            AdministrationEntity newAdmin = ConVertToEntity(oldAdmin, administration);
            AdministrationEntity changeAdmin = administrationRepository.save(newAdmin);
            AdministrationEntity findAdmin = administrationRepository.findByAdministrationId(changeAdmin.getAdministrationId());
            if(findAdmin.equals(changeAdmin))
            {
                return changeAdmin;
            }
            else
            {
                throw new UpdateFailedException("데이터 변경을 시도했으나, 변경되지 않았습니다.");
            }
        }
        else
        {
            throw new FindFailedException("기존 일정 데이터를 찾을 수 없습니다.");
        }
    }
    public boolean exists(String EncodingAdminsistrationId)
    {
        return administrationRepository.existsByAdministrationId(EncodingAdminsistrationId);
    }
    public boolean existsByDate(LocalDate AdminsistrationDate)
    {
        return administrationRepository.existsByAdministrationDate(AdminsistrationDate);
    }
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean Delete(String EncodingAdministrationId)
    {
        boolean bool = administrationRepository.existsByAdministrationId(EncodingAdministrationId);
        if (bool)
        {
            administrationRepository.deleteByAdministrationId(EncodingAdministrationId);
            boolean bool2 = administrationRepository.existsByAdministrationId(EncodingAdministrationId);
            if(bool2)
            {
                throw new DeleteFailedException("일정 삭제를 시도했는데, 삭제가 되지 않고 남아있어요");
            }
            else
            {
                return bool;
            }
        }
        else
        {
            throw new FindFailedException("해당 코드로 삭제할 수 있는 일정표가 존재하지 않아요");
        }
    }
    public List<AdministrationEntity> FindAll()
    {
        List<AdministrationEntity> administrationEntities = administrationRepository.findAll();
        if(administrationEntities.isEmpty())
        {
            throw new FindFailedException("일정 데이터를 찾았는데, 데이터베이스가 비어 있어요");
        }
        else if(administrationEntities != null)
        {
            return administrationEntities;
        }
        else
        {
            throw new FindFailedException("알 수 없는 오류로 데이터베이스 정보를 찾을 수 없어요! 다시 시도해주세요");
        }
    }

    public AdministrationEntity FindByAdministration(String EncodingAdministrationId)
    {
        AdministrationEntity AdministrationEntity = administrationRepository.findByAdministrationId(EncodingAdministrationId);
        if(AdministrationEntity != null)
        {
            return  AdministrationEntity;
        }
        else
        {
            throw new FindFailedException("일정 데이터를 찾을 수 없었어요.");
        }
    }
    private AdministrationEntity ConVertToEntity(AdministrationEntity oldAdmin, AdministrationEntity administration)
    {
        return AdministrationEntity.builder()
                .administrationId(oldAdmin.getAdministrationId())
                .adminstrationType(administration.getAdminstrationType())
                .administrationDate(administration.getAdministrationDate())
                .build();
    }


}
