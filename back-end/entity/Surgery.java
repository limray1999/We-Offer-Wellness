package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Lob;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@DiscriminatorValue(value = "surgery")
public class Surgery extends Treatment {

    @Column(nullable = false)
    private String surgeryName;

    private String description;

    @Column(nullable = false)
    private LocalDate surgeryDate;

    private String surgeryResult;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
