package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.Product;
import com.microservice.bienservice.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTagName(String tagName);


    Product findByReference(String reference);

    Product findByTagNameAndReference(String tag, String reference);

    List<Product> findByTag(Tag tag);
}
