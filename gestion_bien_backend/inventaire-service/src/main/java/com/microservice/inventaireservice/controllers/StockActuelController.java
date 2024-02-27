package com.microservice.inventaireservice.controllers;

import com.microservice.inventaireservice.entities.StockActuel;
import com.microservice.inventaireservice.services.StockActuelService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
public class StockActuelController {
    private final StockActuelService stockActuelService;

    public StockActuelController(StockActuelService stockActuelService) {
        this.stockActuelService = stockActuelService;
    }

    @PostMapping
    public void addStockActuel() {
        stockActuelService.addStockActuel();
    }

    @GetMapping
    public List<StockActuel> getStockActuel() {
        return stockActuelService.getStockActuel();
    }

    @GetMapping("/products/{reference}")
    public List<StockActuel> getStockActuelByReference(@PathVariable String reference) {
        return stockActuelService.getStockActuelByReference(reference);
    }

    @GetMapping("/byDate/{date}")
    public List<StockActuel> getStockActuelByDate(@PathVariable String date) {
        return stockActuelService.getStockActuelByDate(date);
    }

}
