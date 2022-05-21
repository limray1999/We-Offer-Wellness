package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.InsuranceCompany;
import com.example.advancedprojdb.repository.InsuranceCompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/insurancecompany")
public class InsuranceCompanyController {
    @Autowired
    private InsuranceCompanyRepository insuranceCompanyRepository;

    @GetMapping("")
    public List<InsuranceCompany> getList() {
        return insuranceCompanyRepository.findAll();
    }

    @GetMapping("/{id}")
    public InsuranceCompany getById(@PathVariable Long id) {
        return insuranceCompanyRepository.findById(id).orElse(null);
    }
}
