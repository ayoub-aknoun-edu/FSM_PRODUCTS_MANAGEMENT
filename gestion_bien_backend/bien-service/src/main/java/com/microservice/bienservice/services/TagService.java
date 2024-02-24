package com.microservice.bienservice.services;

import com.microservice.bienservice.entities.SuperTag;
import com.microservice.bienservice.entities.Tag;
import com.microservice.bienservice.repositories.SuperTagRepository;
import com.microservice.bienservice.repositories.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final SuperTagRepository superTagRepository;
    public TagService(TagRepository tagRepository, SuperTagRepository superTagRepository) {
        this.tagRepository = tagRepository;
        this.superTagRepository = superTagRepository;
    }


    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }
    public List<Tag> getAllTagsBySuperTag(String superTagName) {
        SuperTag superTag = superTagRepository.findByName(superTagName).get();
        return tagRepository.findAllBySuperTag(superTag);
    }

    public Tag getAllByTagNameAndSuperTagName(String tagName, String superTagName) {
        SuperTag superTag = superTagRepository.findByName(superTagName).get();
        return tagRepository.findByNameAndSuperTag(tagName, superTag);
    }

    public Tag getTagById(Long id) {
        Tag tag= tagRepository.findById(id).orElse(null);
        if (tag == null)
            System.out.println("Tag not found");
        return tag;
    }


    public Tag addTag(Tag tag, SuperTag superTag) {
        return tagRepository.findByName(tag.getName())
                .orElseGet(() -> {
                    Tag tmpTag = new Tag(tag.getName());
                    SuperTag spTag = superTagRepository.findByName(superTag.getName()).get();
                    tmpTag.setSuperTag(spTag);
                    tmpTag.setStock_min(tag.getStock_min());
                    return tagRepository.save(tmpTag);
                });
    }

    public Tag updateTag(Tag tag) {
        Tag existingTag = tagRepository.findById(tag.getId()).get();
        existingTag.setName(tag.getName());
        return tagRepository.save(existingTag);
    }

    public Tag updateTagQuantity(Tag tag, Long quantity) {
        Tag existingTag = tagRepository.findById(tag.getId()).get();
        existingTag.setQuantity(quantity);
        return tagRepository.save(existingTag);
    }

    public String deleteTag(Long id) {
        tagRepository.deleteById(id);
        return "Tag removed !! " + id;
    }


}
