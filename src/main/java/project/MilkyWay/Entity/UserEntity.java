package project.MilkyWay.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "User")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class UserEntity
{
    @Id
    @Column(name = "userId")
    private String userID; //아이디
    @Column(name = "password")
    private String Password; //비밀번호
    @Column(name = "email")
    private String email; //비밀번호 찾기 구현을 위한 이메일
}
