package com.microservice.bonsortieservice.repositories;

import com.microservice.bonsortieservice.entities.ExitedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExitedProductRepository extends JpaRepository<ExitedProduct,Long>{
}
