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
public class Registration {
    @Id
    @SequenceGenerator(
            name = "registration_sequence",
            allocationSize = 1,
            sequenceName = "registration_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "registration_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private LocalDate registrationDate;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    //Foreign Keys
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "hospital_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Hospital hospital;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="patient_id",
            referencedColumnName = "id",
            nullable = false
    )
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(
            name="ICD",
            referencedColumnName = "ICD",
            nullable = false
    )
    private Disease disease;
}
