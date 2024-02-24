package com.microservice.bienservice.models;

import lombok.*;

import java.util.Date;

@Getter @Setter @ToString
public class EntryVoucher {
    private long evNumber;
    private String description;
    private Date date;
}
