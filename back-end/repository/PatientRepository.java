package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Hospital;
import com.example.advancedprojdb.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    List<Patient> findByHospital(Hospital hospital);

    List<Patient> findByLastNameContaining(String firstName);

    List<Patient> findByFirstNameContaining(String name);
}
