package com.microservice.inventaireservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class FeuilleComptage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private boolean isProcessed;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @OneToMany
    private List<FeuilleComptageData> data;
}
