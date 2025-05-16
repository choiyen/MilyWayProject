package project.MilkyWay.noticeMain.Common.DTO;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import project.MilkyWay.noticeMain.Notice.DTO.NoticeDTO;
import project.MilkyWay.noticeMain.NoticeDetail.DTO.NoticeDetailDTO;

import java.util.List;

@Getter
@Builder
@ToString
public class NoticeJsonDTO
{
    private NoticeDTO noticeDTO;
    private List<NoticeDetailDTO> noticeDetailDTO;
}
