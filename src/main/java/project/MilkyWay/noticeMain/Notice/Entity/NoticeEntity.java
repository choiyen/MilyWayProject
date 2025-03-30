package project.MilkyWay.noticeMain.Notice.Entity;


import jakarta.persistence.*;
import lombok.*;
import project.MilkyWay.ComonType.Enum.CleanType;
import project.MilkyWay.noticeMain.NoticeDetail.Entity.NoticeDetailEntity;

import java.util.Collection;

@Entity
@Table(name = "Notice")
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@ToString
public class NoticeEntity
{
    @Id
    @Column(name = "NoticeId")
    private String noticeId; // 후기 ID : primary key이자 10자리의 렌덤키
    @Column(name = "type", nullable = false)
    @Enumerated(EnumType.STRING)
    private CleanType type; // 어떤 유형의 일 : 이사청소, 입주청소, 주거청소.....
    @Column(name = "greeting", nullable = false)
    private String greeting;



    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "NoticeId", referencedColumnName = "NoticeId")
    public Collection<NoticeDetailEntity> noticeDetailEntities;
}
