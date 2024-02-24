package com.microservice.inventaireservice.entities;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class StockActuel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String reference;
    private Long quantity;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private Date date;
    private String status;
}
