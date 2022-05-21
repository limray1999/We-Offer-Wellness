package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "patpayment")
public class PatPayment extends Payment {

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
}
