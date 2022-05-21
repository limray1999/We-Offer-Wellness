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
                        name = "phone_number_unique",
                        columnNames = "phone_number"
                )
        }
)
public class HosDept {

    @Id
    @SequenceGenerator(
            name = "hosdept_sequence",
            sequenceName = "hosdept_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "hosdept_sequence"
    )
    private Long Id;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private Integer buildingNumber;

    @Column(nullable = false)
    private Integer floor;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    @ManyToOne(optional = false)
    @JoinColumn(
            name = "hospital_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Hospital hospital;
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "department_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Department department;
}
