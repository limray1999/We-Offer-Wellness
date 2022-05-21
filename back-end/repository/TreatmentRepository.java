package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.entity.Registration;
import com.example.advancedprojdb.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreatmentRepository extends JpaRepository<Treatment, Long> {
    List<Treatment> findByRegistration(Registration registration);
    List<Treatment> findByPatient(Patient patient);
}
