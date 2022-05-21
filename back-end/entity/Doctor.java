package com.example.advancedprojdb.entity;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "Doctor")
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(
        name = "dcotor_type",
        discriminatorType = DiscriminatorType.STRING
)
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "office_number_unique",
                        columnNames = "office_number"
                ),
                @UniqueConstraint(
                        name = "personal_number_unique",
                        columnNames = "personal_number"
                )
        }
)
public class Doctor extends Employee{

    @Column(nullable = false)
    private String specialty;

    @Column(name = "office_number", nullable = false, length = 20)
    private String officeNumber;

    @Column(name = "personal_number", nullable = false, length = 20)
    private String personalNumber;

}
