package com.example.advancedprojdb.repository;


import com.example.advancedprojdb.entity.EmergencyContact;
import com.example.advancedprojdb.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
    List<EmergencyContact> findByPatient(Patient patient);
}
