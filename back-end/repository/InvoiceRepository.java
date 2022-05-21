package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Invoice;
import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.entity.Treatment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByTreatment(Treatment treatment);
}
