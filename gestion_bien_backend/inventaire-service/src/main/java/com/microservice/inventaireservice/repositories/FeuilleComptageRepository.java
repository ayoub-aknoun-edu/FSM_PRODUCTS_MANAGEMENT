package com.microservice.inventaireservice.repositories;

import com.microservice.inventaireservice.entities.FeuilleComptage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeuilleComptageRepository extends JpaRepository<FeuilleComptage,Long> {

}
