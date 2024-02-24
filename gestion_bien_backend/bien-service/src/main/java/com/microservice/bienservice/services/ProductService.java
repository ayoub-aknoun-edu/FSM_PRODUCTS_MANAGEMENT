package com.microservice.bienservice.services;

import com.microservice.bienservice.clients.EntryVoucherRestClient;
import com.microservice.bienservice.entities.*;
import com.microservice.bienservice.models.EntryVoucher;
import com.microservice.bienservice.repositories.*;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final AccessoryRepository accessoryRepository;
    private final TagRepository tagRepository;
    private final HistoryRepository historyRepository;
    private final SuperTagRepository superTagRepository;
    private final TechnicalSheetService technicalSheetService;
    private final DocumentRepository documentRepository;
    private final EntryVoucherRestClient entryVoucherRestClient;
    private final TagService tagService;
    private final SuperTagService superTagService;


    public ProductService(ProductRepository productRepository, AccessoryRepository accessoryRepository, TagRepository tagRepository, TechnicalSheetRepository technicalSheetRepository, HistoryRepository historyRepository, SuperTagRepository superTagRepository, TechnicalSheetService technicalSheetService, DocumentRepository documentRepository, EntryVoucherRestClient entryVoucherRestClient, TagService tagService, SuperTagService superTagService) {
        this.productRepository = productRepository;
        this.accessoryRepository = accessoryRepository;
        this.tagRepository = tagRepository;
        this.historyRepository = historyRepository;
        this.superTagRepository = superTagRepository;
        this.technicalSheetService = technicalSheetService;
        this.documentRepository = documentRepository;
        this.entryVoucherRestClient = entryVoucherRestClient;
        this.tagService = tagService;
        this.superTagService = superTagService;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll().stream().peek(product -> {
            EntryVoucher entryVoucher = entryVoucherRestClient.getEntryVoucherByEV(product.getEv_number());
            product.setReceipt(entryVoucher);
        }).collect(Collectors.toList());
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    public Product getProductByReference(String reference) {

        Product product =  productRepository.findByReference(reference);
        EntryVoucher entryVoucher = entryVoucherRestClient.getEntryVoucherByEV(product.getEv_number());
        product.setReceipt(entryVoucher);
        return product;
    }


    public List<Product> getProductByTag(String tag) {
        return productRepository.findByTagName(tag);
    }

    public Product addProduct(Product product) {
        // create or update the associated super tag
        SuperTag superTag = superTagService.addSuperTag(product.getTag().getSuperTag());
        // create or update the associated tag
        Tag tag = tagService.addTag(product.getTag(), superTag);
        tag.setQuantity(tag.getQuantity() + product.getQuantity());
        product.setTag(tag);
        // create the associated technical sheet
        TechnicalSheet technicalSheet = technicalSheetService.addTechnicalSheet(product.getTechnicalSheet());
        product.setTechnicalSheet(technicalSheet);
        // create the product
        Product createdProduct = productRepository.save(product);
        // create associated accessories
        for (Accessory accessory : product.getAccessories()) {
            accessory.setProduct(createdProduct);
            accessoryRepository.save(accessory);
        }
        // create associated documents
        for (Document document: product.getDocuments()){
            document.setProduct(createdProduct);
            documentRepository.save(document);
        }
        // associate the entry voucher
        EntryVoucher entryVoucher = entryVoucherRestClient.getEntryVoucherByEV(product.getEv_number());
        if (entryVoucher != null) {
            product.setReceipt(entryVoucher);
        }
        // create the history
        History history = History.builder()
                .action("added")
                .date(product.getReceipt().getDate())
                .productReference(product.getReference())
                .quantity(product.getQuantity())
                .tag(product.getTag())
                .build();
        historyRepository.save(history);
        return createdProduct;
    }


    public Product updateProduct(Product product) {
        Product existingProduct = productRepository.findById(product.getId()).orElse(null);
        if (existingProduct == null) {
            return null;
        }
        existingProduct.setName(product.getName());
        // TODO: add the warehouse after adding the inventaire service
        TechnicalSheet existingTechnicalSheet = existingProduct.getTechnicalSheet();
        TechnicalSheet technicalSheet = product.getTechnicalSheet();
        existingTechnicalSheet.setColor(technicalSheet.getColor());
        existingTechnicalSheet.setDimensions(technicalSheet.getDimensions());
        existingTechnicalSheet.setWeight(technicalSheet.getWeight());
        existingTechnicalSheet.setWarnings(technicalSheet.getWarnings());
        technicalSheetService.updateTechnicalSheet(existingTechnicalSheet);
        existingProduct.setTechnicalSheet(existingTechnicalSheet);
        return productRepository.save(existingProduct);
    }
    public String deleteProduct(Long id) {
        Product product = productRepository.findById(id).get();
        Tag tag = product.getTag();
        tag.setQuantity(tag.getQuantity() - product.getQuantity());
        tagRepository.save(tag);
        History history = History.builder()
                .action("removed")
                .date(new Date())
                .productReference(product.getReference())
                .quantity(product.getQuantity())
                .tag(product.getTag())
                .build();
        historyRepository.save(history);
        productRepository.deleteById(id);
        return "Product removed !! " + id;
    }

    public List<History> getHistoryByTagName(String tagName) {
        return historyRepository.findByTagName(tagName);
    }

    public List<History> getHistoryByProductReference(String reference) {
        return historyRepository.findHistoriesByProductReference(reference);
    }


    public ResponseEntity<Object> getBsProducts(String tag, String name, int limit) {
        Product toRetproduct = productRepository.findByTagNameAndReference(tag, name);
        if (toRetproduct == null) {
            return ResponseEntity.badRequest().body("the product does not exist");
        }
        if (toRetproduct.getQuantity() < limit) {
           return ResponseEntity.badRequest().body("the quantity of the product is less than the limit");
        }
        else  {
            Product product = productRepository.findById(toRetproduct.getId()).get();
            product.setQuantity(product.getQuantity()-limit);
            tagService.updateTagQuantity(product.getTag(),product.getTag().getQuantity()-limit);
            productRepository.save(product);
            History history = History.builder()
                    .action("removed from bon de sortie")
                    .date(new Date())
                    .productReference(product.getReference())
                    .quantity(limit)
                    .tag(product.getTag())
                    .build();
            historyRepository.save(history);
            toRetproduct.setQuantity(limit);
            return ResponseEntity.ok(toRetproduct);
        }
    }

    public void setBsProductReturn(String tag, String name, int limit) {
        Product product = productRepository.findByTagNameAndReference(tag, name);
        product.setQuantity(product.getQuantity()+limit);
        tagService.updateTagQuantity(product.getTag(),product.getTag().getQuantity()+limit);
        productRepository.save(product);
        History history = History.builder()
                .action("added from bon de sortie")
                .date(new Date())
                .productReference(product.getReference())
                .quantity(limit)
                .tag(product.getTag())
                .build();
        historyRepository.save(history);
    }

    public List<Product> getProductsByTagNames(String tagName, String supertagName) {
        Tag tag = tagService.getAllByTagNameAndSuperTagName(tagName, supertagName);
        return productRepository.findByTag(tag);
    }

}
