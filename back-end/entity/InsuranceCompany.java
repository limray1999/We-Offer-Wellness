package com.example.advancedprojdb.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlSeeAlso;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "phone_number_unique",
                        columnNames = "phone_number"
                ),
                @UniqueConstraint(
                        name = "name_unique",
                        columnNames = "name"
                )
        }
)
public class InsuranceCompany {

    @Id
    @SequenceGenerator(
            name = "insurance_company_sequence",
            allocationSize = 1,
            sequenceName = "insurance_company_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "insurance_company_sequence"
    )
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "phone_number", nullable = false, length = 9)
    private String phoneNumber;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;
}
