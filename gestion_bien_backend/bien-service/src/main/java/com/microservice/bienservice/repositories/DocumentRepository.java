package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}
