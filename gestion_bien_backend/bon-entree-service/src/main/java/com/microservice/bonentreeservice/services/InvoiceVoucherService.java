package com.microservice.bonentreeservice.services;

import com.microservice.bonentreeservice.entities.Invoice;
import com.microservice.bonentreeservice.repositories.InvoiceRepository;
import org.springframework.stereotype.Service;

@Service
public class InvoiceVoucherService {
    private final InvoiceRepository invoiceRepository;

    public InvoiceVoucherService(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }

    public Invoice addInvoice(Invoice invoice){
        return invoiceRepository.save(invoice);
    }
    public void deleteInvoice(Long id){
        invoiceRepository.deleteById(id);
    }

    public Invoice updateInvoice(Invoice invoice){
        Invoice existingInvoice = invoiceRepository.findById(invoice.getId()).orElse(null);
        if(existingInvoice == null){
            return null;
        }
        existingInvoice.setTotal_amount(invoice.getTotal_amount());
        existingInvoice.setDate(invoice.getDate());
        return invoiceRepository.save(existingInvoice);
    }

}
