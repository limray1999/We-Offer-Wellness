package com.example.advancedprojdb.controller;


import com.example.advancedprojdb.entity.*;
import com.example.advancedprojdb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private FulltimeDoctorRepository fullTimeDoctorRepository;
    @Autowired
    private ConsultingDoctorRepository consultingDoctorRepository;
    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/doctor/count")
    public long countDoctor() {
        return doctorRepository.count();
    }

    @GetMapping("")
    public List<Employee> getEmployee() {
        return employeeRepository.findAll();
    }

    @GetMapping("/{id}")
    public Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    @GetMapping("/firstname/{firstName}")
    public Employee getEmployeeByFirstName(@PathVariable String firstName) {
        return employeeRepository.getByFirstName(firstName);
    }

    @GetMapping("/doctor")
    public List<Employee> getDoctor() {
        return doctorRepository.findAll();
    }

    @GetMapping("/doctor/{id}")
    public Employee getDoctorById(@PathVariable Long id) {
        return doctorRepository.findById(id).orElse(null);
    }

    @GetMapping("/doctor/firstname/{firstName}")
    public List<Employee> getDoctorByFirstName(@PathVariable String firstName) {
        return doctorRepository.findByFirstName(firstName);
    }

    @GetMapping("/doctor/lastname/{lastName}")
    public List<Employee> getDoctorByLastName(@PathVariable String lastName) {
        return doctorRepository.findByLastName(lastName);
    }

    @GetMapping("/doctor/hospital/{hospitalId}")
    public List<Employee> getDoctorByHospitalId(@PathVariable Long hospitalId) {
        Hospital hospital = hospitalRepository.findById(hospitalId).orElse(null);
        return doctorRepository.findByHospital(hospital);
    }

    @GetMapping("/doctor/patient/{patientId}")
    public List<Employee> getDoctorByPatientId(@PathVariable Long patientId) {
        Patient patient = patientRepository.findById(patientId).orElse(null);
        Hospital hospital = hospitalRepository.findById(patient.getHospital().getId()).orElse(null);
        return doctorRepository.findByHospital(hospital);
    }

    @PostMapping("/consulting")
    public Employee saveCDoctor(@RequestBody ConsultingDoctor doctor) {
        doctor.setTbl_last_date(LocalDateTime.now());
        return consultingDoctorRepository.save(doctor);
    }

    @PostMapping("/fulltime")
    public Employee saveFDoctor(@RequestBody FulltimeDoctor doctor) {
        doctor.setTbl_last_date(LocalDateTime.now());
        return fullTimeDoctorRepository.save(doctor);
    }

    @PutMapping("/consulting")
    public Employee updateCDoctor(@RequestBody ConsultingDoctor doctor) {
        doctor.setTbl_last_date(LocalDateTime.now());
        return consultingDoctorRepository.save(doctor);
    }

    @PutMapping("/fulltime")
    public Employee updateFullDoctor(@RequestBody FulltimeDoctor doctor) {
        doctor.setTbl_last_date(LocalDateTime.now());
        return fullTimeDoctorRepository.save(doctor);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return;
    }
}
