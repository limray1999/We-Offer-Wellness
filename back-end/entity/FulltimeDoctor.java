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
@DiscriminatorValue(value = "fulltime")
public class FulltimeDoctor extends Doctor {

    @Column(nullable = false)
    private LocalDate hireDate;

    @Column(nullable = false)
    private Integer salary;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
