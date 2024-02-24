package com.microservice.bienservice.services;

import com.microservice.bienservice.entities.Accessory;
import com.microservice.bienservice.repositories.AccessoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccessoryService {
    private final AccessoryRepository accessoryRepository;

    public AccessoryService(AccessoryRepository accessoryRepository) {
        this.accessoryRepository = accessoryRepository;
    }

    public List<Accessory> getAccessoriesByProductId(Long productId) {
        return accessoryRepository.findByProductId(productId);
    }

    public Accessory addAccessory(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }

    public void addAccessories(List<Accessory> accessories) {
        accessoryRepository.saveAll(accessories);
    }

}
