package com.microservice.bienservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

@NoArgsConstructor
@Entity
@Getter @Setter
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long Id ;
    private String name ;
    private long quantity;
    private long stock_min;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "supertag_id")
    private SuperTag superTag ;
    public  Tag(String name){
        this.name = name;
    }
}
