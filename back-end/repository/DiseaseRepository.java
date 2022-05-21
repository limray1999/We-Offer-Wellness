package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Disease;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiseaseRepository extends JpaRepository<Disease, String> {
}
