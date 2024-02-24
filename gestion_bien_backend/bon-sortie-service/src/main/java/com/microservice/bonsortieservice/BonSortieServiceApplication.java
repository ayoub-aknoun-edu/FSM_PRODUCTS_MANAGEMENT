package com.microservice.bonsortieservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class BonSortieServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BonSortieServiceApplication.class, args);
    }

}
