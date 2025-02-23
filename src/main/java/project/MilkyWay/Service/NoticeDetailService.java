package project.MilkyWay.Service;

import org.springframework.stereotype.Service;

@Service
public class NoticeDetailService
{
}

/**
 * - NoticeDTO와 NoticedetaillDTO는 1대 다 관계로 묶인다.
 * - NotciedetaillDTO가 저장되지 않으면 NoticeDTO를 삭제하는 로직 필요
 */