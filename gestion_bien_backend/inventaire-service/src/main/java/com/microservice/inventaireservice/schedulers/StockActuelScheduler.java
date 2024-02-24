package com.microservice.inventaireservice.schedulers;

import com.microservice.inventaireservice.services.FeuillComptageService;
import com.microservice.inventaireservice.services.StockActuelService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


@Component
public class StockActuelScheduler {
    private final StockActuelService stockActuelService;
    public StockActuelScheduler(StockActuelService stockActuelService) {
        this.stockActuelService = stockActuelService;
    }
    // run every 10 seconds
    //@Scheduled(fixedRate = 10000)
    // run every day at 00:00
    @Scheduled(cron = "0 0 0 * * ?")
    public void addStockActuel(){
        stockActuelService.addStockActuel();
    }

  }
