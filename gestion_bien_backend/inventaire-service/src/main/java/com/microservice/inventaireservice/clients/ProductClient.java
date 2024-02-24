package com.microservice.inventaireservice.clients;

import com.microservice.inventaireservice.models.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@FeignClient(name="PRODUCT-SERVICE")
public interface ProductClient {
@GetMapping("/product")
    List<Product> getProducts();
}
