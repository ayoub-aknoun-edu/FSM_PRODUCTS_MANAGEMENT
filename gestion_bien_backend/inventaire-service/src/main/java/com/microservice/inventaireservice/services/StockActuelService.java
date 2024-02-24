package com.microservice.inventaireservice.services;

import com.microservice.inventaireservice.clients.ProductClient;
import com.microservice.inventaireservice.entities.StockActuel;
import com.microservice.inventaireservice.repositories.StockActuelRepository;
import org.springframework.stereotype.Service;

import javax.swing.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class StockActuelService {
    private final StockActuelRepository stockActuelRepository;
    private final ProductClient productClient;
    public StockActuelService(StockActuelRepository stockActuelRepository, ProductClient productClient) {
        this.stockActuelRepository = stockActuelRepository;
        this.productClient = productClient;
    }

    public void addStockActuel(){
        productClient.getProducts().forEach(product -> {
            long st = product.getQuantity();
            product.setStatus(st==0L?"bien epuise":st<product.getTag().getStock_min()? "bien bientôt epuise":"bien en stock");
            stockActuelRepository.save(StockActuel.builder()
                            .quantity(product.getQuantity())
                            .reference(product.getReference())
                            .date(new Date())
                    .build());
        });
    }

    public List<StockActuel> getStockActuel() {
        return stockActuelRepository.findAll();
    }

    public List<StockActuel> getStockActuelByReference(String reference) {
        return stockActuelRepository.findByReference(reference);
    }

    public List<StockActuel> getStockActuelByDate(String date) {
        // date format: dd-MM-yyyy
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
        try {
            Date d = formatter.parse(date);
            return stockActuelRepository.findByDate(d);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
