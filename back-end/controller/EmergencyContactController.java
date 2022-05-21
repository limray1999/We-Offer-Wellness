package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.EmergencyContact;
import com.example.advancedprojdb.repository.EmergencyContactRepository;
import com.example.advancedprojdb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/emergencycontact")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/patient/{id}")
    public List<EmergencyContact> getByPatientId(@PathVariable Long id) {
        return emergencyContactRepository.findByPatient(patientRepository.findById(id).orElse(null));
    }

    @GetMapping("/{id}")
    public EmergencyContact getById(@PathVariable Long id) {
        return emergencyContactRepository.findById(id).orElse(null);
    }

    @PostMapping("")
    public EmergencyContact saveEC(@RequestBody EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }

    @PutMapping("")
    public EmergencyContact updateEC(@RequestBody EmergencyContact emergencyContact) {
        return emergencyContactRepository.save(emergencyContact);
    }

    @DeleteMapping("/{id}")
    public void deleteEC(@PathVariable Long id) {
        emergencyContactRepository.deleteById(id);
        return;
    }
}
