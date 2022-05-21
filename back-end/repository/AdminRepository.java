package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Administrator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<Administrator, Long> {
    Administrator findByUsername(String username);
}
