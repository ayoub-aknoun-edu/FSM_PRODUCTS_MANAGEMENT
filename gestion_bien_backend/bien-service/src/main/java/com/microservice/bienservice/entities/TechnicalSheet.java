package com.microservice.bienservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@NoArgsConstructor
@Entity
@Getter @Setter
public class TechnicalSheet {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long Id ;
    private String color;
    private double weight;
    private String dimensions;
    private String warnings;

}
