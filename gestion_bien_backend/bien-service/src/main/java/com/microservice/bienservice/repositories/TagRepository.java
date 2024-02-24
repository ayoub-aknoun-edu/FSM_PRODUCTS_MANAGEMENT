package com.microservice.bienservice.repositories;

import com.microservice.bienservice.entities.SuperTag;
import com.microservice.bienservice.entities.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TagRepository extends JpaRepository<Tag, Long> {

    Optional<Tag> findByName(String name);

    List<Tag> findAllBySuperTag(SuperTag superTag);

    Tag findByNameAndSuperTag(String tagName, SuperTag superTag);
}

