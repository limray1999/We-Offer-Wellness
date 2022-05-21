package com.example.advancedprojdb.repository;


import com.example.advancedprojdb.entity.LogInAccount;
import com.example.advancedprojdb.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogInAccountRepository extends JpaRepository<LogInAccount, Long> {
    LogInAccount getByEmail(String s);
    LogInAccount getByPatient(Patient patient);
}
