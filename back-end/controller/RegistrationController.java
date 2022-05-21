package com.example.advancedprojdb.controller;


import com.example.advancedprojdb.entity.Disease;
import com.example.advancedprojdb.entity.Hospital;
import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.entity.Registration;
import com.example.advancedprojdb.repository.DiseaseRepository;
import com.example.advancedprojdb.repository.HospitalRepository;
import com.example.advancedprojdb.repository.PatientRepository;
import com.example.advancedprojdb.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/registration")
public class RegistrationController {

    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DiseaseRepository diseaseRepository;
    @Autowired
    private HospitalRepository hospitalRepository;

    @GetMapping("/{id}")
    public Registration findById(@PathVariable Long id) {
        return registrationRepository.findById(id).orElse(null);
    }

    @GetMapping("/patient/{id}")
    public List<Registration> findByPatient(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        return registrationRepository.findByPatient(patient);
    }

    @PostMapping("/patient/{id}")
    public Registration addByPatient(@PathVariable Long id, @RequestBody HashMap<String, String> map) {
        Patient patient = patientRepository.findById(id).orElse(null);
        Hospital hospital = patient.getHospital();
        Disease disease = diseaseRepository.findById(map.get("icd")).orElse(null);
        Registration registration = Registration.builder()
                .registrationDate(LocalDate.now())
                .patient(patient)
                .hospital(hospital)
                .disease(disease)
                .tbl_last_date(LocalDateTime.now())
                .build();
        return registrationRepository.save(registration);
    }

    @DeleteMapping("{id}")
    public void deleteById(@PathVariable Long id) {
        registrationRepository.deleteById(id);
        return;
    }
}
