package com.microservice.inventaireservice.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Tag {
    String name;
    SuperTag superTag;
    private long stock_min;
}
