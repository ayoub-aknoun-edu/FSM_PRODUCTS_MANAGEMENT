package com.microservice.bonentreeservice.controllers;

import com.microservice.bonentreeservice.entities.EntryVoucher;
import com.microservice.bonentreeservice.services.EntryVoucherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entryVoucher")
public class EntryVoucherController {
    private final EntryVoucherService entryVoucherService;

    public EntryVoucherController(EntryVoucherService entryVoucherService) {
        this.entryVoucherService = entryVoucherService;
    }

    @PostMapping
    public EntryVoucher addEntryVoucher(@RequestBody EntryVoucher entryVoucher){
        return entryVoucherService.addEntryVoucher(entryVoucher);
    }
    @GetMapping
    public List<EntryVoucher> getAllEntryVouchers(){
        return entryVoucherService.getAllEntryVouchers();
    }

    @GetMapping ("/{evNumber}")
    public EntryVoucher getEntryVoucherByEV(@PathVariable long evNumber){
        return entryVoucherService.getEntryVoucherByEV(evNumber);
    }

}
