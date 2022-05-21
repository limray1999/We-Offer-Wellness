package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "inpatient")
public class InPatient extends Patient {
    @Column(nullable = false)
    private Integer floor;
    @Column(nullable = false)
    private Integer bedNumber;
    @Column(nullable = false)
    private LocalDate admissionDate;
    private LocalDate dischargeDate;
    @Column(nullable = false)
    private LocalDateTime tbl_last_date;
}
