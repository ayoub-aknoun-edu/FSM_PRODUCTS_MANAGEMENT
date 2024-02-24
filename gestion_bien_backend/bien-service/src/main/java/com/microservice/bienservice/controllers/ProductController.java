package com.microservice.bienservice.controllers;

import com.microservice.bienservice.entities.History;
import com.microservice.bienservice.entities.Product;
import com.microservice.bienservice.entities.SuperTag;
import com.microservice.bienservice.entities.Tag;
import com.microservice.bienservice.services.ProductService;
import com.microservice.bienservice.services.SuperTagService;
import com.microservice.bienservice.services.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;
    private  final SuperTagService superTagService;
    private final TagService tagService;


    public ProductController(ProductService productService, SuperTagService superTagService, TagService tagService) {
        this.productService = productService;
        this.superTagService = superTagService;
        this.tagService = tagService;
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product){
        return productService.addProduct(product);
    }

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMIN')")
    public List<Product> getAllProduct(){
        return productService.getAllProducts();
    }

    @GetMapping("/{reference}")
    public Product getProductByReference(@PathVariable String reference){
        return productService.getProductByReference(reference);
    }

    @PutMapping("/updateProduct")
    public Product updateProduct(@RequestBody Product product){
        return productService.updateProduct(product);
    }
    @DeleteMapping("/deleteProduct/{id}")
    public void deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
    }

    @PostMapping("/addSuperTag")
    public SuperTag addSuperTag(@RequestBody SuperTag superTag){

        return superTagService.addSuperTag(superTag);
    }
    @GetMapping({"/history/tag/{tag}"})
    public List<History> getHistoryByTag(@PathVariable String tag){
        return productService.getHistoryByTagName(tag);
    }

    @GetMapping({"/history/reference/{reference}"})
    public List<History> getHistoryByProduct(@PathVariable String reference){
        return productService.getHistoryByProductReference(reference);
    }

    @GetMapping({"/bs/{tag}/{name}/{limit}"})
    public ResponseEntity<Object> getBsProducts(@PathVariable String tag, @PathVariable String name, @PathVariable int limit){
        return productService.getBsProducts(tag,name,limit);
    }

    @GetMapping({"/bs/return/{tag}/{name}/{limit}"})
    public void setBsProductReturn(@PathVariable String tag, @PathVariable String name, @PathVariable int limit){
        productService.setBsProductReturn(tag,name,limit);
    }


    @GetMapping({"/tag/names"})
    public List<Product> getProductsByTagName(@RequestParam String tagName, @RequestParam String supertagName){
        return productService.getProductsByTagNames(tagName,supertagName);
    }

    @PostMapping("/addTag")
    public Tag addTag(@RequestBody Tag tag){
        return tagService.addTag(tag,tag.getSuperTag());
    }

}



