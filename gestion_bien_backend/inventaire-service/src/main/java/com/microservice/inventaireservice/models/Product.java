package com.microservice.inventaireservice.models;

import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
public class    Product {
    private String reference;
    private String name;
    private  String warehouse;
    private String supplier;
    private long quantity;
    private Tag tag;
    private String status;
}
