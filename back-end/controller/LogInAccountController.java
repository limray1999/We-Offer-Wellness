package com.example.advancedprojdb.controller;


import com.example.advancedprojdb.entity.LogInAccount;
import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.repository.LogInAccountRepository;
import com.example.advancedprojdb.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/account")
public class LogInAccountController {
    @Autowired
    private LogInAccountRepository logInAccountRepository;
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("")
    public List<LogInAccount> getAccount() {
        return logInAccountRepository.findAll();
    }

    @GetMapping("/{email}")
    public LogInAccount getById(@PathVariable String email) {
        return logInAccountRepository.getByEmail(email);
    }

    @GetMapping("/password/{email}")
    public String getPasswordByEmail(@PathVariable String email) {
        return logInAccountRepository.getByEmail(email).getPassword();
    }

    @GetMapping("/patient/{id}")
    public boolean existsByPatientId(@PathVariable Long id) {
        return logInAccountRepository.getByPatient(patientRepository.getById(id))==null?false:true;
    }

    @PostMapping("")
    public LogInAccount saveNewAccount(@RequestBody HashMap<String, String> map) {
        LogInAccount newAccount = LogInAccount.builder()
                .email(map.get("email"))
                .password(map.get("password"))
                .tbl_last_date(LocalDateTime.now())
                .patient(patientRepository.findById(Long.parseLong(map.get("patientId"))).orElse(null))
                .build();
        return logInAccountRepository.save(newAccount);
    }
}
