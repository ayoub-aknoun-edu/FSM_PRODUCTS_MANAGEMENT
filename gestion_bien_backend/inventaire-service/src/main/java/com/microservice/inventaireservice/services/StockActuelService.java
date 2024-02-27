package com.microservice.inventaireservice.services;

import com.microservice.inventaireservice.clients.ProductClient;
import com.microservice.inventaireservice.entities.StockActuel;
import com.microservice.inventaireservice.repositories.StockActuelRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            String date = formatter.format(new Date());
            try {
                Date d = formatter.parse(date);
                product.setStatus(st==0L?"bien epuise":st<product.getTag().getStock_min()? "bien bientôt epuise":"bien en stock");
                stockActuelRepository.save(StockActuel.builder()
                        .quantity(product.getQuantity())
                        .reference(product.getReference())
                        .date(d)
                        .status(product.getStatus())
                        .build());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });
    }

    public List<StockActuel> getStockActuel() {
        return stockActuelRepository.findAll().stream().map(stockActuel -> {
            stockActuel.setDate(new Date(stockActuel.getDate().getTime() + 86400000));
            return stockActuel;
        }).toList();
    }

    public List<StockActuel> getStockActuelByReference(String reference) {
        return stockActuelRepository.findByReference(reference);
    }

    public List<StockActuel> getStockActuelByDate(String date) {
        // date format: dd-MM-yyyy
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-M-yyyy");
            Date d = formatter.parse(date);
            return stockActuelRepository.findByDate(d).stream().map(stockActuel -> {
                // add one day to date
                stockActuel.setDate(new Date(stockActuel.getDate().getTime() + 86400000));
                return stockActuel;
            }).toList();
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
