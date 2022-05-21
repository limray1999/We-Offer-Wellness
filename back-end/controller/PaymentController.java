package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.*;
import com.example.advancedprojdb.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private TreatmentRepository treatmentRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private PatPaymentRepository patPaymentRepository;

    @GetMapping("/patient/id/{id}")
    public List<Payment> findByPatientId(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        List<Treatment> treatments = treatmentRepository.findByPatient(patient);
        List<Invoice> invoices = new LinkedList<>();
        for(Treatment treatment: treatments) {
            invoices.addAll(invoiceRepository.findByTreatment(treatment));
        }
        List<Payment> payments = new LinkedList<>();
        for(Invoice invoice: invoices) {
            payments.addAll(paymentRepository.findByInvoice(invoice));
        }
        return payments;
    }

    @GetMapping("/invoice/id/{id}")
    public List<Payment> findByInvoiceId(@PathVariable Long id) {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        return paymentRepository.findByInvoice(invoice);
    }

    @GetMapping("")
    public List<Payment> findAll() {
        return paymentRepository.findAll();
    }

    @PostMapping("/patpayment")
    public Payment savePatientPayment(@RequestBody HashMap<String, String> map) {
        PatPayment patPayment = PatPayment.builder()
                .patient(patientRepository.findById(Long.parseLong(map.get("patientId"))).orElse(null))
                .paymentDate(LocalDate.now())
                .tbl_last_date(LocalDateTime.now())
                .notes(map.get("notes"))
                .paymentMethod(map.get("paymentMethod"))
                .accountNumber(map.get("accountNumber"))
                .bankName(map.get("bankName"))
                .amount(Double.parseDouble(map.get("amount")))
                .invoice(invoiceRepository.findById(Long.parseLong(map.get("invoiceId"))).orElse(null))
                .build();
        return patPaymentRepository.save(patPayment);
    }

}
