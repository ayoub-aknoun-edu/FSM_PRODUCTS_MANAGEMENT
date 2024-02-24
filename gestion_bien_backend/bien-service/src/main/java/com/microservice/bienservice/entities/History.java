package com.microservice.bienservice.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;
    private String action ;
    private Date date ;
    private long quantity ;
    private String productReference ;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag ;

    public History() {
    }
    @Override
    public String toString() {
        return "the "+tag.getName()+" with reference '"+productReference+"' has been "+action+" at "+date+" by a quantity of "+quantity;
    }
}
