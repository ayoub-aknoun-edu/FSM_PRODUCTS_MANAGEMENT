package com.microservice.inventaireservice.services;

import com.microservice.inventaireservice.clients.ProductClient;
import com.microservice.inventaireservice.entities.FeuilleComptage;
import com.microservice.inventaireservice.entities.FeuilleComptageData;
import com.microservice.inventaireservice.repositories.FeuilleComptageDataRepository;
import com.microservice.inventaireservice.repositories.FeuilleComptageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class FeuillComptageService {
    private final FeuilleComptageRepository feuilleComptageRepository;
    private final FeuilleComptageDataRepository feuilleComptageDataRepository;
    private final ProductClient productClient;
    public FeuillComptageService(FeuilleComptageRepository feuilleComptageRepository, FeuilleComptageDataRepository feuilleComptageDataRepository, ProductClient productClient) {
        this.feuilleComptageRepository = feuilleComptageRepository;
        this.feuilleComptageDataRepository = feuilleComptageDataRepository;
        this.productClient = productClient;
    }

    public FeuilleComptage generateFeuilleComptage() {
       List<FeuilleComptageData> data= new ArrayList<>();
       productClient.getProducts().forEach(product -> {
           long st = product.getQuantity();
           product.setStatus(st==0L?"bien epuise":st<product.getTag().getStock_min()? "bien bientôt epuise":"bien en stock");
           data.add(feuilleComptageDataRepository.save(FeuilleComptageData.builder()
            .name(product.getName())
            .reference(product.getReference())
            .recognized_quantity(0L)
            .status(product.getStatus())
            .supplier(product.getSupplier())
            .tag(product.getTag().getName())
            .theorique_quantity(product.getQuantity())
            .warehouse(product.getWarehouse())
            .build()));
});
return feuilleComptageRepository.save(FeuilleComptage.builder()
        .data(data)
        .isProcessed(false)
        .date(new Date())
        .build());
    }


    public FeuilleComptage processFeuilleComptage(FeuilleComptage feuilleComptage) {
        FeuilleComptage ex = feuilleComptageRepository.findById(feuilleComptage.getId()).orElseThrow(() -> new RuntimeException("Feuille de comptage introuvable"));
        ex.setProcessed(true);
        for(int i=0;i<feuilleComptage.getData().size();i++){
            ex.getData().get(i).setRecognized_quantity(feuilleComptage.getData().get(i).getRecognized_quantity());
            ex.getData().get(i).setEcart(ex.getData().get(i).getTheorique_quantity()-ex.getData().get(i).getRecognized_quantity()==0L?"Positif":"Negatif");
        }
        return feuilleComptageRepository.save(ex);
    }
}
