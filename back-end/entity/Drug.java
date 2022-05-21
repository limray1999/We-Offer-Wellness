package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "drug")
public class Drug extends Treatment {
    @Column(nullable = false)
    private String drugName;
    @Column(nullable = false)
    private Integer dose;
    @Column(nullable = false)
    private LocalDateTime tbl_last_date;
}
