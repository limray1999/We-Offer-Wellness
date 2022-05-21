package com.example.advancedprojdb.controller;

import com.example.advancedprojdb.entity.Invoice;
import com.example.advancedprojdb.entity.Patient;
import com.example.advancedprojdb.entity.Treatment;
import com.example.advancedprojdb.repository.InvoiceRepository;
import com.example.advancedprojdb.repository.PatientRepository;
import com.example.advancedprojdb.repository.TreatmentRepository;
import net.bytebuddy.dynamic.scaffold.MethodGraph;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/invoice")
public class InvoiceController {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private TreatmentRepository treatmentRepository;
    @Autowired
    private InvoiceRepository invoiceRepository;

    @GetMapping("/patient/id/{id}")
    public List<Invoice> findByPatientId(@PathVariable Long id) {
        Patient patient = patientRepository.findById(id).orElse(null);
        List<Treatment> treatments = treatmentRepository.findByPatient(patient);
        List<Invoice> invoices = new LinkedList<>();
        for(Treatment treatment: treatments) {
            invoices.addAll(invoiceRepository.findByTreatment(treatment));
        }
        return invoices;
    }

    @GetMapping("")
    public List<Invoice> findAll() {
        return invoiceRepository.findAll();
    }

    @GetMapping("/id/{id}")
    public List<Invoice> findById(@PathVariable Long id) {
        List<Invoice> invoices = new LinkedList<>();
        invoices.add(invoiceRepository.findById(id).orElse(null));
        return invoices;
    }

    @GetMapping("/treatment/id/{id}")
    public List<Invoice> findByTreatmentId(@PathVariable Long id) {
        Treatment treatment = treatmentRepository.findById(id).orElse(null);
        return invoiceRepository.findByTreatment(treatment);
    }

    @PutMapping("/needtopay/{id}")
    public Invoice updateNeedToPay(@PathVariable Long id, @RequestBody HashMap<String, Double> map) {
        Invoice invoice = invoiceRepository.findById(id).orElse(null);
        invoice.setNeedToPay(map.get("needToPay"));
        return invoiceRepository.save(invoice);
    }

}
