package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.TechnicalSheet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TechnicalSheetRepository extends JpaRepository<TechnicalSheet, Long> {
}
