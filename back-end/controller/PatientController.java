package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.Hospital;
import com.example.advancedprojdb.entity.InPatient;
import com.example.advancedprojdb.entity.OutPatient;
import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.exception.CustomException;
import com.example.advancedprojdb.exception.CustomExceptionHandler;
import com.example.advancedprojdb.repository.HospitalRepository;
import com.example.advancedprojdb.repository.InPatientRepository;
import com.example.advancedprojdb.repository.OutPatientRepository;
import com.example.advancedprojdb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private OutPatientRepository outPatientRepository;
    @Autowired
    private InPatientRepository inPatientRepository;
    @Autowired
    private HospitalRepository hospitalRepository;

    @GetMapping("/count")
    public long countPatient() {
        return patientRepository.count();
    }

    @GetMapping("")
    public List<Patient> getAll() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public Patient getById(@PathVariable Long id) {
        return patientRepository.findById(id).orElse(null);
    }

    @GetMapping("/exists/{id}")
    public boolean existsById(@PathVariable Long id) {
        return patientRepository.findById(id).isPresent();
    }

    @PostMapping("/out")
    public Patient saveOut(@RequestBody OutPatient outPatient) {
        outPatient.setTbl_last_date(LocalDateTime.now());
        return patientRepository.save(outPatient);
    }

    @PostMapping("/in")
    public Patient saveIn(@RequestBody InPatient inPatient) {
        inPatient.setTbl_last_date(LocalDateTime.now());
        return patientRepository.save(inPatient);
    }

    @PutMapping("/out")
    public Patient updateOut(@RequestBody OutPatient outPatient) throws Exception {
        outPatient.setTbl_last_date(LocalDateTime.now());
        try{
            patientRepository.save(outPatient);
        } catch (Exception e) {
            throw new RuntimeException("Duplicated phone number");
        }
        return outPatient;
    }

    @PutMapping("/in")
    public Patient updateIn(@RequestBody InPatient inPatient) {
        inPatient.setTbl_last_date(LocalDateTime.now());
        try {
            patientRepository.save(inPatient);
        } catch (Exception e) {
            throw e;
        }
        return inPatient;
    }

    @DeleteMapping("/out/{id}")
    public void deleteOutById(@PathVariable Long id) {
        outPatientRepository.deleteById(id);
        return;
    }

    @DeleteMapping("/in/{id}")
    public void deleteInById(@PathVariable Long id) {
        inPatientRepository.deleteById(id);
        return;
    }

    @DeleteMapping("{id}")
    public void deletePatientById(@PathVariable Long id) {
        patientRepository.deleteById(id);
        return;
    }

    @GetMapping("/firstname/{name}")
    public List<Patient> findByFirstName(@PathVariable String name) {
        return patientRepository.findByFirstNameContaining(name);
    }

    @GetMapping("/lastname/{name}")
    public List<Patient> findByLastName(@PathVariable String name) {
        return patientRepository.findByLastNameContaining(name);
    }

    @GetMapping("/hospital/{id}")
    public List<Patient> findByHospitalId(@PathVariable Long id) {
        Hospital hospital = hospitalRepository.findById(id).orElse(null);
        return patientRepository.findByHospital(hospital);
    }
}
