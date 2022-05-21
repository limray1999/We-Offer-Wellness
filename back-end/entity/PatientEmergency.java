package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PatientEmergency {
    @Id
    @SequenceGenerator(
            name = "patient_emergency_sequence",
            allocationSize = 1,
            sequenceName = "patient_emergency_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patient_emergency_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    //Foreign Keys
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "patient_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Patient patient;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "emergency_contact_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private EmergencyContact emergencyContact;
}
