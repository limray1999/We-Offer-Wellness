package com.example.advancedprojdb.controller;


import com.example.advancedprojdb.entity.Disease;
import com.example.advancedprojdb.repository.DiseaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/disease")
public class DiseaseController {

    @Autowired
    private DiseaseRepository diseaseRepository;

    @GetMapping("")
    public List<Disease> getDiseases() {
        return diseaseRepository.findAll();
    }

    @GetMapping("/{icd}")
    public Disease getByICD(@PathVariable String icd) {
        return diseaseRepository.findById(icd).orElse(null);
    }

    @PostMapping("")
    public Disease saveDisease(@RequestBody Disease disease) {
        disease.setTbl_last_date(LocalDateTime.now());
        return diseaseRepository.save(disease);
    }

    @PutMapping("")
    public Disease updateDisease(@RequestBody Disease disease) {
        disease.setTbl_last_date(LocalDateTime.now());
        return diseaseRepository.save(disease);
    }

    @DeleteMapping("/{icd}")
    public void deleteByICD(@PathVariable String icd) {
        diseaseRepository.deleteById(icd);
        return;
    }
}
