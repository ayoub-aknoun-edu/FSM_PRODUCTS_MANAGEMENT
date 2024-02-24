package com.microservice.bonentreeservice.repositories;

import com.microservice.bonentreeservice.entities.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice,Long>{

}
