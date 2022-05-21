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
                        name = "specialty_name_unique",
                        columnNames = "name"
                )
        }
)
public class Specialty {

    @Id
    @SequenceGenerator(
            name = "specialty_sequence",
            sequenceName = "specialty_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "specialty_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

}
