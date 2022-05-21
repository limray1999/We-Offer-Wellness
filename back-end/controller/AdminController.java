package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.Administrator;
import com.example.advancedprojdb.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;
    @GetMapping("/{username}")
    public String getPasswordByUsername(@PathVariable String username) {
        Administrator administrator = adminRepository.findByUsername(username);
        return administrator!=null?administrator.getPassword():null;
    }
}
