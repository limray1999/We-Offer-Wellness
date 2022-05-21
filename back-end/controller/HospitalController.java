package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.Hospital;
import com.example.advancedprojdb.repository.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/hospital")
public class HospitalController {

    @Autowired
    private HospitalRepository hospitalRepository;

    @GetMapping("")
    public List<Hospital> getHospitals() {
        return hospitalRepository.findAll();
    }

    @GetMapping("/{id}")
    public Hospital getHospitalById(@PathVariable Long id) {
        return hospitalRepository.findById(id).orElse(null);
    }

    @GetMapping("/count")
    public long countHospital() {
        return hospitalRepository.count();
    }

//    @PostMapping("")
//    public Hospital postHospital(@RequestBody Map<String, String> map) {
//        Hospital hospital = Hospital.builder()
//                .name(map.get("name"))
//                .tbl_last_date(LocalDateTime.now())
//                .city(map.get("city"))
//                .country(map.get("country"))
//                .emergencyNumber(map.get("emergencyNumber"))
//                .generalNumber(map.get("generalNumber"))
//                .raNumber(map.get("raNumber"))
//                .street(map.get("street"))
//                .zipcode(map.get("zipcode"))
//                .state(map.get("state"))
//                .build();
//        return hospitalRepository.save(hospital);
//    }

    @PostMapping("")
    public Hospital postHospital(@RequestBody Hospital hospital) {
        hospital.setTbl_last_date(LocalDateTime.now());
        return hospitalRepository.save(hospital);
    }

    @PutMapping("")
    public Hospital updateHospital(@RequestBody Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        hospitalRepository.deleteById(id);
        return;
    }

    @GetMapping("/state/{state}")
    public List<Hospital> getHospitalByState(@PathVariable String state) {
        return hospitalRepository.findByState(state);
    }

    @GetMapping("/zipcode/{zipcode}")
    public List<Hospital> getHospitalByZipcode(@PathVariable String zipcode) {
        return hospitalRepository.findByZipcode(zipcode);
    }

    @GetMapping("/name/{name}")
    public List<Hospital> getHospitalByName(@PathVariable String name) {
        return hospitalRepository.findByNameContaining(name);
    }

}
