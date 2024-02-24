package com.microservice.inventaireservice.controllers;

import com.microservice.inventaireservice.entities.FeuilleComptage;
import com.microservice.inventaireservice.services.FeuillComptageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feuille-comptage")
public class FeilleComptageController {
    private final FeuillComptageService feuillComptageService;

    public FeilleComptageController(FeuillComptageService feuillComptageService) {
        this.feuillComptageService = feuillComptageService;
    }


    @PostMapping
    public FeuilleComptage createFeuilleComptage() {
       return feuillComptageService.generateFeuilleComptage();
    }

    @PostMapping("/process")
    public FeuilleComptage processFeuilleComptage(@RequestBody FeuilleComptage feuilleComptage) {
       return feuillComptageService.processFeuilleComptage(feuilleComptage);
    }
}
