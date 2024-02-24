package com.microservice.bonentreeservice.entities;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class EntryVoucher {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long evNumber;
    private String description;
    @JsonFormat(pattern="yyyy-MM-dd")
    private Date date;
    @OneToOne
    private Invoice invoice;
}
