package com.microservice.bienservice.services;

import com.microservice.bienservice.entities.SuperTag;
import com.microservice.bienservice.repositories.SuperTagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SuperTagService {
    private final SuperTagRepository tagRepository;

    public SuperTagService(SuperTagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public List<SuperTag> getAllSuperTags() {
        return tagRepository.findAll();
    }

    public SuperTag getSuperTagById(Long id) {
        SuperTag SuperTag= tagRepository.findById(id).orElse(null);
        if (SuperTag == null)
            System.out.println("SuperTag not found");
        return SuperTag;
    }

    public SuperTag addSuperTag(SuperTag SuperTag) {
        return tagRepository.findByName(SuperTag.getName()).orElseGet(()->tagRepository.save(SuperTag));
    }

    public SuperTag updateSuperTag(SuperTag SuperTag) {
        SuperTag existingTag = tagRepository.findById(SuperTag.getId()).get();
        existingTag.setName(SuperTag.getName());
        return tagRepository.save(existingTag);
    }

    public String deleteSuperTag(Long id) {
        tagRepository.deleteById(id);
        return "SuperTag removed !! " + id;
    }
}
