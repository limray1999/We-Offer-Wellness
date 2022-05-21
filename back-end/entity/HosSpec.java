package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class HosSpec {

    @Id
    @SequenceGenerator(
            name = "hosspec_sequence",
            sequenceName = "hosspec_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "hosspec_sequence"
    )
    private Long Id;

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
            name = "specialty_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Specialty specialty;


}
