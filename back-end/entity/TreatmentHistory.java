package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TreatmentHistory {

    @Id
    @SequenceGenerator(
            name = "patient_treatment_history_sequence",
            sequenceName = "treatment_history_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "treatment_history_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private Long registrationId;

    @Column(nullable = false)
    private String treatmentType;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;
}
