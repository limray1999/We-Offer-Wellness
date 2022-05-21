package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {
    List<Hospital> findByState(String state);

    List<Hospital> findByZipcode(String zipcode);

    List<Hospital> findByNameContaining(String name);
}
