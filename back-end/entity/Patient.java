package com.example.advancedprojdb.entity;


import com.fasterxml.jackson.annotation.JsonManagedReference;
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
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(
        name = "patient_type",
        discriminatorType = DiscriminatorType.STRING
)
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "phone_number_unique",
                        columnNames = "phone_number"
                ),
                @UniqueConstraint(
                        name = "insurance_number_unique",
                        columnNames = "insurance_number"
                )
        }
)
public class Patient {

    @Id
    @SequenceGenerator(
            name = "patient_sequence",
            sequenceName = "patient_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "patient_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Column(name = "phone_number", nullable = false, length = 20)
    private String phoneNumber;

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

    @Column(nullable = false)
    private LocalDate birthDate;

    @Column(nullable = false)
    private String race;

    @Column(nullable = false)
    private String maritalStatus;

    @Column(nullable = false)
    private String gender;

    @Column(name = "insurance_number")
    private String insuranceNumber;

    @Column(nullable = false)
    private String bloodGroup;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    //Foreign Keys
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "hospital_id",
            nullable = false,
            referencedColumnName = "Id"
    )
    @JsonProperty("hospital")
    private Hospital hospital;

    @ManyToOne
    @JoinColumn(
            name = "insurance_company_id",
            referencedColumnName = "Id"
    )
    @JsonProperty("insuranceCompany")
    private InsuranceCompany insuranceCompany;

//    @OneToOne(mappedBy = "patient")
//    private LogInAccount logInAccount;
}
