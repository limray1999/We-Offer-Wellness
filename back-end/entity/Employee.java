package com.example.advancedprojdb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(
        name = "employee_type",
        discriminatorType = DiscriminatorType.STRING
)
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "ssn_unique",
                        columnNames = "ssn"
                )
        }
)
public abstract class Employee {

    @Id
    @SequenceGenerator(
            name = "employee_sequence",
            sequenceName = "employee_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "employee_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private String firstName;

    private String middleName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false, length = 9)
    private String SSN;

    @Column(nullable = false)
    private LocalDate birthDate;

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

}
