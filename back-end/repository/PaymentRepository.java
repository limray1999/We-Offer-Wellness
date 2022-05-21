package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Invoice;
import com.example.advancedprojdb.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByInvoice(Invoice invoice);
}
