package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.*;
import com.example.advancedprojdb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/treatment")
public class TreatmentController {

    @Autowired
    private RegistrationRepository registrationRepository;
    @Autowired
    private TreatmentRepository treatmentRepository;
    @Autowired
    private DrugRepository drugRepository;
    @Autowired
    private LaboratoryRepository laboratoryRepository;
    @Autowired
    private SurgeryRepository surgeryRepository;

    @GetMapping("/registration/{id}")
    public List<Treatment> findByRegistration(@PathVariable Long id) {
        Registration registration = registrationRepository.findById(id).orElse(null);
        return treatmentRepository.findByRegistration(registration);
    }

    @GetMapping("/{id}")
    public Treatment findById(@PathVariable Long id) {
        return treatmentRepository.findById(id).orElse(null);
    }

    @PostMapping("/drug")
    public Treatment saveDrug(@RequestBody Drug drug) {
        drug.setTbl_last_date(LocalDateTime.now());
        return drugRepository.save(drug);
    }

    @PostMapping("/lab")
    public Treatment saveLab(@RequestBody Laboratory laboratory) {
        laboratory.setTbl_last_date(LocalDateTime.now());
        return laboratoryRepository.save(laboratory);
    }

    @PostMapping("/surgery")
    public Treatment saveSurgery(@RequestBody Surgery surgery) {
        surgery.setTbl_last_date(LocalDateTime.now());
        return surgeryRepository.save(surgery);
    }

    @PutMapping("/drug")
    public Treatment updateDrug(@RequestBody Drug drug) {
        drug.setTbl_last_date(LocalDateTime.now());
        return drugRepository.save(drug);
    }

    @PutMapping("/lab")
    public Treatment updateLab(@RequestBody Laboratory laboratory) {
        laboratory.setTbl_last_date(LocalDateTime.now());
        return laboratoryRepository.save(laboratory);
    }

    @PutMapping("/surgery")
    public Treatment updateSurgery(@RequestBody Surgery surgery) {
        surgery.setTbl_last_date(LocalDateTime.now());
        return surgeryRepository.save(surgery);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        treatmentRepository.deleteById(id);
    }
}
