package project.MilkyWay.mapper;

import org.apache.ibatis.annotations.Mapper;
import project.MilkyWay.Entity.UserEntity;

import java.util.List;

@Mapper
public interface UserMapper {
    List<UserEntity> findAll();
    UserEntity FindByUserId(String userId);
    void deleteByUserId(String userId);
    void Insert(UserEntity user);
    void Update(UserEntity user);

}