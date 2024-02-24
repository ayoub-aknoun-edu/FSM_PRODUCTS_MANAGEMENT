package com.microservice.bienservice.controllers;

import com.microservice.bienservice.entities.SuperTag;
import com.microservice.bienservice.entities.Tag;
import com.microservice.bienservice.services.SuperTagService;
import com.microservice.bienservice.services.TagService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stag")
public class STagsController {

    private final SuperTagService superTagService;
    private final TagService tagService;

    public STagsController(SuperTagService superTagService, TagService tagService) {
        this.superTagService = superTagService;
        this.tagService = tagService;
    }

    @GetMapping("/superTags")
    public List<SuperTag> getAllSuperTags() {
        return superTagService.getAllSuperTags();
    }

    @GetMapping("/tags")
    public List<Tag> getAllTags() {
        return tagService.getAllTags();
    }

    @GetMapping("/tagsBySuperTag/{superTagName}")
    public List<Tag> getAllTagsBySuperTag(@PathVariable String superTagName) {
        return tagService.getAllTagsBySuperTag(superTagName);
    }

}
