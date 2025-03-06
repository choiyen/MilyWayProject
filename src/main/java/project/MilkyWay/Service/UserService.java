package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Entity.UserEntity;
import project.MilkyWay.Expection.DeleteFailedException;
import project.MilkyWay.Expection.FindFailedException;
import project.MilkyWay.Expection.InsertFailedException;
import project.MilkyWay.Expection.UpdateFailedException;
import project.MilkyWay.mapper.UserMapper;

import java.util.List;

@Service
public class UserService //관리자 아이디를 관리하는 DTO
{
    @Autowired
    private UserMapper userMapper;

  public UserEntity createUser(UserEntity user)
  {
      userMapper.Insert(user);
      UserEntity newUser = userMapper.FindByUserId(user.getUserID());
      if(newUser != null)
      {
          return newUser;
      }
      else
      {
          throw new InsertFailedException("관리자 아이디 생성에 실패하였습니다.");
      }
  }
    public UserEntity UpdateUser(String userId, UserEntity user)
  {
      UserEntity previousUser = userMapper.FindByUserId(userId);
      if(previousUser != null)
      {
          UserEntity ChangeUser = ChangeUserEntity(previousUser, user);
          userMapper.Update(user);
          UserEntity newUser = userMapper.FindByUserId(userId);
          if(newUser.getUserID().equals(ChangeUser.getUserID()) && newUser.getPassword().equals(ChangeUser.getPassword())&& newUser.getEmail().equals(ChangeUser.getEmail()))
          {
              return newUser;
          }
          else
          {
              throw new UpdateFailedException();
          }
      }
      else
      {
          throw new FindFailedException("회원정보에 해당 아이디는 존재하지 않아요");
      }
  }
    public void DeleteUser(String userId)
  {
      UserEntity user = userMapper.FindByUserId(userId);
      if(user != null)
      {
          userMapper.deleteByUserId(userId);
      }
      else
      {
          throw new DeleteFailedException("삭제할 아이디 정보가 틀립니다.");
      }

  }
  public UserEntity findUserId(String userId)
  {
      UserEntity user = userMapper.FindByUserId(userId);
      if(user != null)
      {
          return user;
      }
      else
      {
          throw new DeleteFailedException("해당 정보의 회원은 존재하지 않아요.");
      }
  }
  public List<UserEntity> findEmail(String Email)
  {
        List<UserEntity> user = userMapper.FindByEmail(Email);
        if(user != null)
        {
            return user;
        }
        else
        {
            throw new FindFailedException("해당 정보의 회원은 존재하지 않아요.");
        }
  }
  private UserEntity ChangeUserEntity(UserEntity previousUser, UserEntity newUser)
  {
      UserEntity user = UserEntity.builder()
              .userID(previousUser.getUserID())
              .Password(newUser.getPassword())
              .email(newUser.getUserID())
              .build();

      return user;
  }
}
