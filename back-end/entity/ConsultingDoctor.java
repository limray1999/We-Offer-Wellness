package com.example.advancedprojdb.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@DiscriminatorValue(value = "consulting")
@Table(
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "contract_number_unique",
                        columnNames = "contract_number"
                )
        }
)
public class ConsultingDoctor extends Doctor{

    @Column(nullable = false)
    private LocalDate contractDate;

    @Column(name = "contract_number", nullable = false)
    private String contractNumber;

    @Column(nullable = false)
    private Integer minimumWeeklyHour;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
