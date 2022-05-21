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
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "emergency_number_unique",
                        columnNames = "emergency_number"
                ),
                @UniqueConstraint(
                        name = "general_number_unique",
                        columnNames = "general_number"
                ),
                @UniqueConstraint(
                        name = "registration_admission_number_unique",
                        columnNames = "ra_number"
                ),
                @UniqueConstraint(
                        name = "name_unique",
                        columnNames = "name"
                )
        }
)
public class Hospital {

    @Id
    @SequenceGenerator(
            name = "hospital_sequence",
            sequenceName = "hospital_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "hospital_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private String name;

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

    @Column(
            name = "emergency_number",
            nullable = false,
            length = 9
    )
    private String emergencyNumber;

    @Column(
            name = "general_number",
            nullable = false,
            length = 9
    )
    private String generalNumber;

    @Column(
            name = "ra_number",
            nullable = false,
            length = 9
    )
    private String raNumber; // Registration and Administration Phone Number

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;
}
