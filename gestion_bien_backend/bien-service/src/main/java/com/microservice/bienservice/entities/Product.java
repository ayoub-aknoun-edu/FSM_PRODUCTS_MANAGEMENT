package com.microservice.bienservice.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.microservice.bienservice.models.EntryVoucher;
import lombok.*;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long  id ;
    private String reference;
    private String name ;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id")
    private Tag tag ;
    //TODO: the receipt will be an added after finilizing inventaire service
    private  String warehouse;
    private long ev_number;
    @Transient
    private EntryVoucher receipt;
    private String supplier;
    private long quantity;
    @OneToOne
    private TechnicalSheet technicalSheet;
    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Set<Accessory> accessories;
    @OneToMany(mappedBy = "product",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private Set<Document> documents;
}
