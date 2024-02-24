package com.microservice.bonentreeservice.services;

import com.microservice.bonentreeservice.entities.EntryVoucher;
import com.microservice.bonentreeservice.repositories.EntryVoucherRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;

@Service
public class EntryVoucherService {
    private final InvoiceVoucherService invoiceVoucherService;
    private final EntryVoucherRepository entryVoucherRepository;
    public EntryVoucherService(InvoiceVoucherService invoiceVoucherService, EntryVoucherRepository entryVoucherRepository) {
        this.invoiceVoucherService = invoiceVoucherService;
        this.entryVoucherRepository = entryVoucherRepository;
    }

    public EntryVoucher addEntryVoucher(EntryVoucher entryVoucher){
        invoiceVoucherService.addInvoice(entryVoucher.getInvoice());

        Date date = new Date();
        entryVoucher.setDate(date);
        return entryVoucherRepository.save(entryVoucher);
    }

    public List<EntryVoucher> getAllEntryVouchers() {
        return entryVoucherRepository.findAll();
    }
    public EntryVoucher getEntryVoucherByEV(Long ev_number) {
        return entryVoucherRepository.findByEvNumber(ev_number).get();
    }
}
