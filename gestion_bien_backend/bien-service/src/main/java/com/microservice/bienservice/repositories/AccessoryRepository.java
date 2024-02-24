package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.Accessory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccessoryRepository extends JpaRepository<Accessory, Long> {

    List<Accessory> findByProductId(Long productId);
}
