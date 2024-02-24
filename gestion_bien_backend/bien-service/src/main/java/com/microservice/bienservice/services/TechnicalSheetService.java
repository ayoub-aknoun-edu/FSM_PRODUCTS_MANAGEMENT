package com.microservice.bienservice.services;

import com.microservice.bienservice.entities.TechnicalSheet;
import com.microservice.bienservice.repositories.TechnicalSheetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicalSheetService {
    private final TechnicalSheetRepository technicalSheetRepository;

    public TechnicalSheetService(TechnicalSheetRepository technicalSheetRepository) {
        this.technicalSheetRepository = technicalSheetRepository;
    }

    public List<TechnicalSheet> getAllTechnicalSheets() {
        return technicalSheetRepository.findAll();
    }

    public TechnicalSheet getTechnicalSheetById(Long id) {
        return technicalSheetRepository.findById(id).orElse(null);
    }

    public TechnicalSheet addTechnicalSheet(TechnicalSheet technicalSheet) {
        return technicalSheetRepository.save(technicalSheet);
    }
    public TechnicalSheet updateTechnicalSheet(TechnicalSheet technicalSheet) {
        TechnicalSheet existingTechnicalSheet = technicalSheetRepository.findById(technicalSheet.getId()).get();
        existingTechnicalSheet.setColor(technicalSheet.getColor());
        existingTechnicalSheet.setWeight(technicalSheet.getWeight());
        existingTechnicalSheet.setDimensions(technicalSheet.getDimensions());
        existingTechnicalSheet.setWarnings(technicalSheet.getWarnings());
        return technicalSheetRepository.save(existingTechnicalSheet);
    }

    public String deleteTechnicalSheet(Long id) {
        technicalSheetRepository.deleteById(id);
        return "TechnicalSheet removed !! " + id;
    }


}
