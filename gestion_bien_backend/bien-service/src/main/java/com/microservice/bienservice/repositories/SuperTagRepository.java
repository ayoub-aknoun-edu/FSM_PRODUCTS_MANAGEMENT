package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.SuperTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuperTagRepository extends JpaRepository<SuperTag,Long> {
    Optional<SuperTag> findByName(String name);

}
