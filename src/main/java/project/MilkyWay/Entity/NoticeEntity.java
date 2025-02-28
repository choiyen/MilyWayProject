package project.MilkyWay.Entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.Collection;

@Entity
@Table(name = "Notice")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class NoticeEntity
{
    @Id
    @Column(name = "NoticeId")
    private String NoticeId; // 후기 ID : primary key이자 10자리의 렌덤키
    @Column(name = "type", nullable = false)
    private String type; // 어떤 유형의 일 : 이사청소, 입주청소, 주거청소.....
    @Column(name = "greeting", nullable = false)
    private String greeting;



    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "NoticeId", insertable = false, updatable = false, referencedColumnName = "NoticeId")
    public Collection<NoticeDetailEntity> noticeDetailEntities;
}
