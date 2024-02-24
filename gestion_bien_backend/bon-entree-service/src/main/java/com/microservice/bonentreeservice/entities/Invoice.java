package com.microservice.bonentreeservice.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float total_amount;
    private Date date;
}
