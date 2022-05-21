package com.example.advancedprojdb.repository;


import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    List<Registration> findByPatient(Patient patient);
}
