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
public class LogInAccount {

    @Id
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    @OneToOne(optional = false)
    @JoinColumn(
            name = "patient_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Patient patient;
}
