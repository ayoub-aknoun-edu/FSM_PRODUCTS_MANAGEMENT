package com.microservice.inventaireservice.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="data")
public class FeuilleComptageData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String reference;
    private String name;
    private String tag;
    private String warehouse;
    private String status;
    private String supplier;
    private Long recognized_quantity;
    private Long theorique_quantity;
    private String ecart;
}
