package project.MilkyWay.DTO;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class NoticeJsonDTO
{
    private NoticeDTO noticeDTO;
    private List<NoticeDetailDTO> noticeDetailDTO;
}
