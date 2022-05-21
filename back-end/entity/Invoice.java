package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Invoice {

    @Id
    @SequenceGenerator(
            name = "invoice_sequence",
            sequenceName = "invoice_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "invoice_sequence"
    )
    private Long Id;
    @Column(nullable = false)
    private LocalDate invoiceDate;
    @Column(nullable = false)
    private Double totalCost;
    @Column(nullable = false)
    private Double needToPay;
    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    @OneToOne(optional = false)
    @JoinColumn(
            name = "treatment_id",
            nullable = false,
            referencedColumnName = "Id"
    )
    private Treatment treatment;
}
