package com.microservice.inventaireservice.repositories;

import com.microservice.inventaireservice.entities.FeuilleComptageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeuilleComptageDataRepository extends JpaRepository<FeuilleComptageData,Long> {
}
