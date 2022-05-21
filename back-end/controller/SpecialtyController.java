package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.Specialty;
import com.example.advancedprojdb.repository.SpecialtyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost/3000")
@RestController
@RequestMapping("/specialty")
public class SpecialtyController {

    @Autowired
    private SpecialtyRepository specialtyRepository;

    @GetMapping("/get")
    public List<Specialty> getSpecialty() {
        return specialtyRepository.findAll();
    }

    @GetMapping("/get/{id}")
    public Optional<Specialty> getSpecialtyById(@PathVariable Long id) {
        return specialtyRepository.findById(id);
    }

    @PostMapping
    public Specialty postSpecialty(@RequestBody String name) {
        Specialty specialty = Specialty.builder()
                .name(name)
                .tbl_last_date(LocalDateTime.now())
                .build();
        return specialtyRepository.save(specialty);
    }
}
