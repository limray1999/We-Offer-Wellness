package com.example.advancedprojdb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class EmergencyContact {

    @Id
    @SequenceGenerator(
            name = "ec_sequence",
            sequenceName = "ec_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "ec_sequence"
    )
    private Long Id;
    @Column(nullable = false)
    private String firstName;
    private String middleName;
    @Column(nullable = false)
    private String lastName;
    @Column(name = "phone_number", nullable = false, length = 9)
    private String phoneNumber;
    @Column(nullable = false)
    private String relationship;
    @Column(nullable = false)
    private String country;
    @Column(nullable = false)
    private String state;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private String street;
    @Column(
            length = 5,
            nullable = false
    )
    private String zipcode;
    private LocalDateTime tbl_last_date;

    //Foreign Key
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "patient_id",
            nullable = false,
            referencedColumnName = "id"
    )
    @JsonProperty("patient")
    private Patient patient;
}
