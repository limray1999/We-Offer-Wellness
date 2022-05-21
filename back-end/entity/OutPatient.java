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
@DiscriminatorValue(value = "outpatient")
public class OutPatient extends Patient {

    @Column(nullable = false)
    private LocalDate followupDate;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
