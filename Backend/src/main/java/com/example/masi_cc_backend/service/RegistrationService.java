package com.example.masi_cc_backend.service;
import com.example.masi_cc_backend.repository.RegistrationRepository;
import com.example.masi_cc_backend.entity.Registration;
import org.springframework.stereotype.Service;
import java.util.List;



@Service
public class RegistrationService {
     private final RegistrationRepository registrationRepository;

      public RegistrationService(RegistrationRepository registrationRepository) {
    this.registrationRepository = registrationRepository;
  }

   public Registration saveRegistration(Registration registration) {
    return registrationRepository.save(registration);
  }


   public List<Registration> getAllRegistrations() {
    return registrationRepository.findAll();
  }
}