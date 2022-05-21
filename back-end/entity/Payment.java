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
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(
        name = "payment_type",
        discriminatorType = DiscriminatorType.STRING
)
public abstract class Payment {
    @Id
    @SequenceGenerator(
            name = "payment_sequence",
            allocationSize = 1,
            sequenceName = "payment_sequence"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "payment_sequence"
    )
    private Long Id;

    @Column(nullable = false)
    private String paymentMethod;

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private LocalDate paymentDate;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String bankName;

    private String notes;

    @Column(nullable = false)
    private LocalDateTime tbl_last_date;

    //Foreign Key
    @ManyToOne(optional = false)
    @JoinColumn(
            name = "invoice_id",
            referencedColumnName = "Id",
            nullable = false
    )
    private Invoice invoice;
}
