package com.example.advancedprojdb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(
        name = "treatment_type",
        discriminatorType = DiscriminatorType.STRING
)
public abstract class Treatment {

    @Id
    @SequenceGenerator(
            name = "treatment_sequence",
            sequenceName = "treatment_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "treatment_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private Double cost;

    @Column(nullable = false)
    private LocalDate startDate;

    private LocalDate endDate;

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    //Foreign Keys
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "patient_id",
            referencedColumnName = "Id",
            nullable = false
    )
    @JsonProperty("patient")
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "doctor_id",
            referencedColumnName = "Id",
            nullable = false
    )
    @JsonProperty("doctor")
    private Doctor doctor;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "registration_id",
            referencedColumnName = "Id",
            nullable = false
    )
    @JsonProperty("registration")
    private Registration registration;


}
