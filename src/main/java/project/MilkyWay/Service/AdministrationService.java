package project.MilkyWay.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project.MilkyWay.Repository.AdministrationRepository;

@Service
public class AdministrationService
{
    @Autowired
    AdministrationRepository administrationRepository;
}
