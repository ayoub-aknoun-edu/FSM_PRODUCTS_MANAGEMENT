package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.History;
import com.microservice.bienservice.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long>{
    List<History> findHistoriesByTag(Tag tag);
    List<History> findHistoriesByProductReference(String reference);

    List<History> findByTagName(String tagName);
}
