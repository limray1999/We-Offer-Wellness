package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "laboratory")
public class Laboratory extends Treatment {

    @Column(nullable = false)
    private String laboratoryName;

    @Column(nullable = false)
    private String testType;

    @Column(nullable = false)
    private LocalDate testDate;

    private String labResult;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
