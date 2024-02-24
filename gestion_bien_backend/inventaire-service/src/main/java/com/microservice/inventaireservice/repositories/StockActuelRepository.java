package com.microservice.inventaireservice.repositories;

import com.microservice.inventaireservice.entities.StockActuel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface StockActuelRepository extends JpaRepository<StockActuel,Long> {
    List<StockActuel> findByReference(String reference);

    List<StockActuel> findByDate(Date date);
}
