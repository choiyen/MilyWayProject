package project.MilkyWay.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.AddressEntity;
import project.MilkyWay.Entity.AdministrationEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.Repository.AddressRepository;

import java.util.List;


@Service
public class AddressService
{
    @Autowired
    AddressRepository addressRepository;

    public AddressEntity insert(AddressEntity newAddressEntity)
    {
        AddressEntity addressEntity = addressRepository.save(newAddressEntity);
        if(addressEntity != null)
        {
            return addressEntity;
        }
        else
        {
            throw new InsertFailedException("고객 주소 데이터를 저장하는데 실패했습니다.");
        }
    }
    public AddressEntity update(AddressEntity newAddressEntity)
    {
        AddressEntity OldAddressEntity = addressRepository.findByAddressId(newAddressEntity.getAddressId());
        if(OldAddressEntity != null)
        {
            AddressEntity ChangeAddressEntity = ConvertToEntity(OldAddressEntity, newAddressEntity);
            AddressEntity ChangeAddressEntity2 = addressRepository.save(ChangeAddressEntity);
            AddressEntity FindedAddressEntity = addressRepository.findByAddressId(ChangeAddressEntity.getAddressId());
            if(FindedAddressEntity.equals(ChangeAddressEntity2))
            {
                return ChangeAddressEntity2;
            }
            else
            {
                throw new UpdateFailedException("고객 주소 데이터가 잘못되어 변경을 시도했으나, 수정에 실패했습니다.");
            }
        }
        else
        {
            throw new FindFailedException("옛날에 저장한 고객의 주소 데이터를 찾지 못했어요. 업데이트가 불가능합니다.");
        }
    }


    public boolean Delete(String EncodingAddressId)
    {
        boolean bool = addressRepository.existsByAddressId(EncodingAddressId);
        if(bool)
        {
            addressRepository.deleteByAddressId(EncodingAddressId);
            boolean bool2 = addressRepository.existsByAddressId(EncodingAddressId);
            if(bool2)
            {
                throw new DeleteFailedException("고객 주소 데이터 삭제에 실패했습니다. 관리자에게 문의하세요");
            }
            else
            {
                return bool;
            }
        }
        else
        {
            throw new DeleteFailedException("삭제할 고객 주소 데이터를 찾을 수 없습니다. 관리자에게 문의하세요");
        }
    }
    public AddressEntity findByAddressId(String EncodingAddressId)
    {
        AddressEntity addressEntity = addressRepository.findByAddressId(EncodingAddressId);
        return addressEntity;
    }
    public List<AddressEntity> findALL()
    {
        List<AddressEntity> addressEntities = addressRepository.findAll();
        if(addressEntities.isEmpty())
        {
            throw new FindFailedException("데이터를 찾으려고 시도했으나, 비어 있어요.");
        }
        else if(addressEntities != null)
        {
            return addressEntities;
        }
        else
        {
            throw new FindFailedException("알 수 없는 오류로 데이터베이스 정보를 찾을 수 없습니다.");
        }
    }
    private AddressEntity ConvertToEntity(AddressEntity oldAddressEntity, AddressEntity newAddressEntity)
    {
        return AddressEntity.builder()
                .addressId(oldAddressEntity.getAddressId())
                .Address(newAddressEntity.getAddress())
                .phoneNumber(newAddressEntity.getPhoneNumber())
                .customer(newAddressEntity.getCustomer())
                .SubmissionDate(newAddressEntity.getSubmissionDate())
                .build();
    }
}
//- 현재 날짜보다 고객의 의뢰 날짜가 뒷날일 떄 데이터를 파기하는 함수 필요
//고객 관리를 위한 목적의 DTO