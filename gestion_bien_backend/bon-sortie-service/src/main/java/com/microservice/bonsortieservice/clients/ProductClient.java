package com.microservice.bonsortieservice.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductClient {
    @GetMapping("/product/bs/{tag}/{name}/{limit}")
    ResponseEntity<Object> getBsProduct(@PathVariable String tag, @PathVariable String name, @PathVariable int limit);

    @GetMapping("/product/bs/return/{tag}/{name}/{limit}")
    void setBsProductReturn(@PathVariable String tag, @PathVariable String name, @PathVariable int limit);
}
